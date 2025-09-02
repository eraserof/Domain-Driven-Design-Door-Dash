import { StringIdObject } from "src/shared/string-id-object";
import { CartItem } from "../../domain/aggregates/cartItem";
import { CartItemRepository } from "../../domain/repositories/cart-Item.repository";
import { ItemNumber } from "../../domain/value-objects/item-number";

export class CartItemRepositoryImpl implements CartItemRepository {
    cartItems: CartItem[]
    index = 0
    constructor() {
        this.cartItems = []
    }

    increament() {
        this.index += 1
    }

    findCartItem(cartId: StringIdObject, itemNumber: ItemNumber): Promise<CartItem | null> {
        return new Promise((resolve) => {
            resolve(this.cartItems.find((c) => c.cartId.equals(cartId) && c.itemNumber.equals(itemNumber)) || null)
        })
    }

    findCartItems(cartId: StringIdObject): Promise<CartItem[]> {
        return new Promise((resolve) => {
            resolve(this.cartItems.filter((c) => c.cartId.equals(cartId)))
        })
    }

    save(cartItem: CartItem): void {
        throw new Error("Method not implemented.");
    }

    delete(cartItem: CartItem): void {
        throw new Error("Method not implemented.");
    }

    getIndex(): Promise<number> {
        let temp = this.index
        return new Promise((resolve) => {
            this.increament()
            resolve(temp)
        })
    }

}