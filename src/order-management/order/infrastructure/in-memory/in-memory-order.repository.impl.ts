import { Order } from "../../domain/aggregates/order";
import { OrderRepository } from "../../domain/repositories/order.repository";
import { OrderRowDTO } from "../dto/order-row-DTO";
import { OrderMapper } from "../mapper/order-mapper";

export class InMemeoryOrderRepositoryImpl implements OrderRepository {
    list: OrderRowDTO[]

    constructor() {
        this.list = []
    }

    saveOrUpdate(order: Order): void {
        let index = this.list.findIndex((i) => i.orderId === order.orderId.toString())
        let converted = OrderMapper.orderToOrderRowDTO(order)
        if (index !== -1) {
            this.list[index] = {
                ...converted,
                updatedAt: new Date().toISOString()
            }
        } else {
            this.list.push({
                ...converted,
                updatedAt: new Date().toISOString(),
                createdAt: new Date().toISOString()
            })
        }
    }

    findById(orderId: string, customerId: string): Promise<Order | null> {
        let orderRow = this.list.find((i) => i.orderId === orderId) || null
        let converted = orderRow ? OrderMapper.orderRowDTOToOrder(orderRow) : null
        return new Promise((resolve) => {
            resolve(converted)
        })
    }

    save(order: Order): Promise<Order> {
        let converted = OrderMapper.orderToOrderRowDTO(order)

        this.list.push({
            ...converted,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        })


        return new Promise((resolve) => {
            resolve(order)
        })
    }

}