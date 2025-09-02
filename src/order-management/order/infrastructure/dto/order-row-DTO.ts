
export interface OrderRowDTO {
    orderId: string,
    orderStatus: string,
    cartId: string,
    customerId: number,
    createdAt: string,
    dasher: number | null,
    estimatedTime?: string,
    deliveredAt: string | null,
    updatedAt: string
}