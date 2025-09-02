import { ItemNumber } from "src/order-management/cart/domain/value-objects/item-number"
import { Price } from "src/order-management/cart/domain/value-objects/price"
import { StringIdObject } from "src/shared/string-id-object"
import { VendorId } from "../value-objects/vendor-id"
import { randomUUID } from "crypto"

export class VendorItem {
    constructor(
        public vendorItemId: StringIdObject,
        public vendorId: VendorId,
        public price: Price,
        public itemNumber: ItemNumber,
        public inStock: number,
    ) { }

    static create(vendorId: VendorId, price: Price, inStock: number, itemNumber: ItemNumber) {
        return new VendorItem(
            StringIdObject.create(randomUUID()),
            vendorId,
            price,
            itemNumber,
            inStock
        )
    }

    removeFromItemStock(quantity: number) {
        if (quantity < 0) throw new Error(`quantity cannot be less than zero`)

        this.inStock -= quantity
        let quantityNotInStock = 0
        if (this.inStock < 0) {
            quantityNotInStock = Math.abs(this.inStock)
        }

        return quantityNotInStock
    }

    addToStock(quantity: number) {
        if (quantity < 0) throw new Error(`quantity cannot be less than zero`)
        this.inStock += quantity
    }
}