import { ItemNumber } from "src/order-management/cart/domain/value-objects/item-number";
import { VendorItem } from "src/vendor/domain/aggregates/vendorItem";
import { VendorItemRepository } from "src/vendor/domain/repositories/vendor-item.repository";
import { VendorId } from "src/vendor/domain/value-objects/vendor-id";

export class VendorItemRepositoryImpl implements VendorItemRepository {
    vendorItems: VendorItem[]
    index = 0

    constructor() {
        this.vendorItems = []
    }

    increamentIndex() {
        this.index += 1
    }

    getIndex(): Promise<number> {
        let temp = this.index
        return new Promise((resolve) => {
            this.increamentIndex()
            resolve(temp)
        })
    }

    find(vendorId: VendorId, itemNumber: ItemNumber): Promise<VendorItem | null> {
        return new Promise((resolve) => {
            resolve(this.vendorItems.find((v) => v.vendorId.equals(vendorId) && v.itemNumber.equals(itemNumber)) || null)
        })
    }

    add(vendorItem: VendorItem): void {
        this.vendorItems.push(vendorItem)
    }

    save(vendorItem: VendorItem): void {
        let index = this.vendorItems.findIndex((v) => v.vendorId.equals(vendorItem.vendorId) && v.itemNumber.equals(vendorItem.itemNumber))
        if (index !== -1) this.vendorItems.splice(index, 1, vendorItem)
        else this.vendorItems.push(vendorItem)
    }

    delete(vendorItem: VendorItem): void {
        let index = this.vendorItems.findIndex((v) => v.vendorId.equals(vendorItem.vendorId) && v.itemNumber.equals(vendorItem.itemNumber))
        if (index !== -1) this.vendorItems.splice(index, 1)
    }
}