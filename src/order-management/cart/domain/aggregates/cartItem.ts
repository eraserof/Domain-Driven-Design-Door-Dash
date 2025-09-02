import { StringIdObject } from "src/shared/string-id-object";
import { ItemNumber } from "../value-objects/item-number";
import { randomUUID } from "crypto";

export class CartItem {
    constructor(
        public cartItemId: StringIdObject,
        public cartId: StringIdObject,
        public itemNumber: ItemNumber,
        public quantity: number,
    ) { }

    static create(cartId: StringIdObject, itemNumber: ItemNumber, quantity: number) {
        return new CartItem(
            StringIdObject.create(randomUUID()),
            cartId,
            itemNumber,
            quantity
        )
    }

    reduceQuantity(quantity: number) {
        if (quantity < 0) throw new Error(`Quantity cannot be less than zero`)
        this.quantity -= quantity
    }

    addToQuantity(quantity: number) {
        if (quantity < 0) throw new Error(`Quantity cannot be less than zero`)
        this.quantity += quantity
    }
}