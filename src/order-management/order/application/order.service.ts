import { Inject, Injectable } from "@nestjs/common";
import { CartService } from "src/order-management/cart/application/cart.service";
import type { IEventBus } from "src/event-bus/interface/event-bus";
import { Order } from "../domain/aggregates/order";
import { UserId } from "../domain/value-objects/user-id";
import { OrderRepository } from "../domain/repositories/order.repository";
import { CartStatus } from "src/order-management/cart/domain/value-objects/cart-status";

@Injectable()
export class OrderService {
    constructor(
        @Inject('OrderRepository') private readonly orderRepo: OrderRepository,
        @Inject('EventBus') private readonly eventBus: IEventBus,
        private readonly cartService: CartService,
    ) {
        this.eventBus.listen('updateOrderStatus', (payload: any) => {
            console.log(`SEND TO NOTIFICATION SERVICE: customer: ${payload.customerId}'s order: ${payload.orderId} is ${payload.orderStatus}`)
        })

        this.eventBus.listen('findDasher', ((payload: any) => {
            console.log(`SEND TO SCHEDULER SERVICE: customer: ${payload.customerId}'s order: ${payload.orderId} is ${payload.orderStatus}`)
        }))

        this.eventBus.listen('placeOrder', ((payload: any) => {
            console.log(`SEND TO ORDERPLACEMENT SERVICE: customer: ${payload.customerId}'s order: ${payload.orderId} is ${payload.orderStatus}`)
        }))

        this.eventBus.listen('orderCanceled', ((payload: any) => {
            console.log(`SEND TO PAYMENT SERVICE: customer: ${payload.customerId}'s order: ${payload.orderId} is ${payload.orderStatus}`)
        }))

    }

    async placeOrder(customerId: number, cartId: string) {
        let cart = await this.cartService.getCartThrowError(cartId)
        if (!cart.cartStatus.equals(CartStatus.payedStatus)) throw new Error('Cart was not payed for yet')
        let order = Order.create({
            cartId: cart.cartId,
            customerId: UserId.create(customerId),
        })
        let savedOrder = await this.orderRepo.save(order)

        this.eventBus.publish('placeOrder', {
            orderId: savedOrder.orderId,
            orderStatus: savedOrder.orderStatus.toString(),
            customerId: savedOrder.customerId.toString(),
            order: savedOrder
        })

        this.eventBus.publish('updateOrderStatus', {
            orderId: savedOrder.orderId,
            orderStatus: savedOrder.orderStatus.toString(),
            customerId: savedOrder.customerId.toString()
        })

        this.eventBus.publish('findDasher', {
            orderId: savedOrder.orderId,
            orderStatus: savedOrder.orderStatus.toString(),
            customerId: savedOrder.customerId.toString()
        })

        // subscribe to an event that fires when a dasher is found and update the order.
    }

    async getOrder(id: string, customerId: string) {
        let order = await this.orderRepo.findById(id, customerId)
        if (!order) throw new Error('Order not found')
        return order
    }

    // Yes, this is an active order
    async cancelOrder(id: string, customerId: string) {
        let order = await this.getOrder(id, customerId)
        order.cancelOrder()
        this.orderRepo.save(order)

        this.eventBus.publish('updateOrderStatus', {
            orderId: order.orderId,
            orderStatus: order.orderStatus.toString(),
            customerId: order.customerId.toString()
        })

        this.eventBus.publish('orderCanceled', {
            orderId: order.orderId,
            orderStatus: order.orderStatus.toString(),
            customerId: order.customerId.toString()
        })
    }

    async assignDasher(orderId: string, dasher: UserId, customerId: string) {
        let order = await this.getOrder(orderId, customerId)

        let cart = await this.cartService.getCartWithIdObject(order.cartId)
        if (!cart.isCartPayed()) throw new Error(`Cart needs to be payed for first`)

        order.assignDasher(dasher)
        this.orderRepo.save(order)

        this.eventBus.publish('updateOrderStatus', {
            orderId: order.orderId,
            orderStatus: order.orderStatus.toString(),
            customerId: order.customerId.toString()
        })
    }

} 