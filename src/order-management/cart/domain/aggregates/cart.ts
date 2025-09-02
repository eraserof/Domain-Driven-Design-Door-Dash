
//Manages Cart, Checkout, Payment Authorization

import { VendorId } from "src/vendor/domain/value-objects/vendor-id"
import { StringIdObject } from "src/shared/string-id-object"
import { randomUUID } from "crypto"
import { CartStatus } from "../value-objects/cart-status"

export class Cart {
    private constructor(
        public cartId: StringIdObject,
        public vendor: VendorId,
        public cartStatus: CartStatus,
        public customerId: StringIdObject,
        public cartTotal?: number,
    ) { }

    static create(vendorId: VendorId, customerId: string) {
        return new Cart(
            StringIdObject.create(randomUUID()),
            vendorId,
            CartStatus.draftStatus,
            StringIdObject.create(customerId)
        )
    }

    static created(cartId: StringIdObject, vendor: VendorId, cartStatus: CartStatus, customerId: StringIdObject, cartTotal?: number,) {
        return new Cart(
            cartId,
            vendor,
            cartStatus,
            customerId,
            cartTotal
        )
    }

    checkOut() {
        // Should calculate the total for the order. The items should be passed in.
    }

    canModifyCart() {
        let canModify = false
        if (this.cartStatus === CartStatus.draftStatus) canModify = true
        return canModify
    }

    isCartPayed() {
        return this.cartStatus.equals(CartStatus.payedStatus)
    }
}