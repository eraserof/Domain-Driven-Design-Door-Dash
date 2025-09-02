import { Order } from "../aggregates/order";

export abstract class OrderRepository {
    abstract findById(orderId: string, customerId: string): Promise<Order | null>
    abstract save(order: Order): Promise<Order>
    abstract saveOrUpdate(order: Order): void
}