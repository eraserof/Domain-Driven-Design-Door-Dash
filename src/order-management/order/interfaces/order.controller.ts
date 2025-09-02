import { Controller, Get, Post } from "@nestjs/common";
import { OrderService } from "../application/order.service";

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get()
    async getOrder(orderId: string, customerId: string) {
        return await this.orderService.getOrder(orderId, customerId)
    }
}