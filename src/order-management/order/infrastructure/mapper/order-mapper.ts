import { StringIdObject } from "src/shared/string-id-object";
import { Order } from "../../domain/aggregates/order";
import { OrderStatus } from "../../domain/value-objects/order-status";
import { OrderId } from "../../domain/value-objects/orderId";
import { OrderRowDTO } from "../dto/order-row-DTO";
import { UserId } from "../../domain/value-objects/user-id";

export const OrderMapper = {
    orderToOrderRowDTO(order: Order): Omit<OrderRowDTO, 'updatedAt'> {
        return {
            cartId: order.cartId.toString(),
            createdAt: order.createdAt.toISOString(),
            customerId: order.customerId.toString(),
            orderId: order.orderId.toString(),
            orderStatus: order.orderStatus.toString(),
            dasher: order.dasher?.toString() || '',
            deliveredAt: order.deliveredAt?.toISOString() || null,
            estimatedTime: order.estimatedTime?.toISOString()
        }
    },

    orderRowDTOToOrder(orderDTO: OrderRowDTO): Order {
        let dash = orderDTO.dasher ? UserId.create(orderDTO.dasher) : null
        return Order.created(
            OrderId.create(orderDTO.orderId),
            OrderStatus.create(orderDTO.orderStatus),
            StringIdObject.create(orderDTO.cartId),
            UserId.create(orderDTO.customerId),
            new Date(orderDTO.createdAt),
            dash ? dash : undefined,
            orderDTO.estimatedTime ? new Date(orderDTO.estimatedTime) : undefined,

        )
    }
}