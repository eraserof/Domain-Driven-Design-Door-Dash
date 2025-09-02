import { randomUUID } from "crypto";
import { OrderStatus } from "../value-objects/order-status";
import { OrderId } from "../value-objects/orderId";
import { UserId } from "../value-objects/user-id";
import { StringIdObject } from "src/shared/string-id-object";

export class Order {
    private constructor(
        public orderId: OrderId,
        public orderStatus: OrderStatus,
        public cartId: StringIdObject,
        public customerId: UserId,
        public createdAt: Date,
        public dasher?: UserId,
        public estimatedTime?: Date,
        public deliveredAt?: Date
    ) { }

    static create(order: {
        cartId: StringIdObject
        customerId: UserId
    }) {
        return new Order(
            OrderId.create(randomUUID()),
            OrderStatus.PLACED,
            order.cartId,
            order.customerId,
            new Date(),
        )
    }

    static created(
        orderId: OrderId,
        orderStatus: OrderStatus,
        cartId: StringIdObject,
        customerId: UserId,
        createdAt: Date,
        dasher?: UserId,
        estimatedTime?: Date,
        deliveredAt?: Date
    ) {
        return new Order(
            orderId,
            orderStatus,
            cartId,
            customerId,
            createdAt,
            dasher,
            estimatedTime,
            deliveredAt
        )
    }

    orderAccepted() {
        if (this.orderStatus !== OrderStatus.PLACED) throw new Error('Can only accept orders that are placed')
        let now = new Date()
        now.setMinutes(now.getMinutes() + 30)

        this.orderStatus = OrderStatus.ACCEPTED
        this.estimatedTime = now
    }

    orderPrepared() {
        if (this.orderStatus !== OrderStatus.ACCEPTED) throw new Error('Can only prep an order if its been accepted')
        this.orderStatus = OrderStatus.PREPARED
    }

    orderPickedUp(dasher: UserId) {
        if (this.orderStatus !== OrderStatus.PREPARED) throw new Error('Can only pickup an order if its been prepared')
        this.orderStatus = OrderStatus.PICKEDUP
        this.dasher = dasher
    }

    orderDelivered() {
        if (this.orderStatus !== OrderStatus.PICKEDUP) throw new Error('Can only prep an order if its been accepted')
        this.orderStatus = OrderStatus.DELIVERED
        this.deliveredAt = new Date()
    }

    assignDasher(dasher: UserId, estimatedTime?: Date) {
        if (this.orderStatus !== OrderStatus.PICKEDUP || this.orderStatus !== OrderStatus.DELIVERED || this.orderStatus !== OrderStatus.CANCELED) throw new Error('Can not assign a dasher in this status')
        this.dasher = dasher
        if (estimatedTime) {
            this.estimatedTime = estimatedTime
        } else {
            let now = new Date()
            now.setMinutes(now.getMinutes() + 15)
            this.estimatedTime = now
        }
    }

    cancelOrder() {
        if (this.orderStatus !== OrderStatus.ACCEPTED || this.orderStatus !== OrderStatus.PLACED) throw new Error('Cannot cancel order in this status')
        this.orderStatus = OrderStatus.CANCELED
    }

}