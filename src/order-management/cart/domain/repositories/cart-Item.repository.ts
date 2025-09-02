import { CartItem } from "../aggregates/cartItem";
import { ItemNumber } from "../value-objects/item-number";
import { StringIdObject } from "src/shared/string-id-object";


export abstract class CartItemRepository {
    abstract findCartItem(cartId: StringIdObject, itemNumber: ItemNumber): Promise<CartItem | null>
    abstract findCartItems(cartId: StringIdObject): Promise<CartItem[]>
    abstract save(cartItem: CartItem): void
    abstract delete(cartItem: CartItem): void

}