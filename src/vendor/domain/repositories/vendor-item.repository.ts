import { ItemNumber } from "src/order-management/cart/domain/value-objects/item-number";
import { VendorItem } from "../aggregates/vendorItem"
import { VendorId } from "../value-objects/vendor-id";

export abstract class VendorItemRepository {
    abstract find(vendorId: VendorId, itemNumber: ItemNumber): Promise<VendorItem | null>
    abstract add(vendorItem: VendorItem): void
    abstract save(vendorItem: VendorItem): void
    abstract delete(vendorItem: VendorItem): void
    abstract getIndex(): Promise<number>
}