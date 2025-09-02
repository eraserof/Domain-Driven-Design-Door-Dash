import { StringIdObject } from "src/shared/string-id-object";
import { Cart } from "../aggregates/cart";

export abstract class CartRepository {
    abstract find(cartId: StringIdObject): Promise<Cart | null>
    abstract save(cart: Cart): Promise<Cart>
    abstract saveOrUpdate(cart: Cart): void
    abstract exists(cart: Cart): Promise<Cart>
    abstract delete(cartId: StringIdObject): Promise<boolean>
}