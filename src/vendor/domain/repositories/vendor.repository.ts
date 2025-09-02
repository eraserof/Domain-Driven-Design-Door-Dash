import { VendorId } from "../value-objects/vendor-id";
import { Vendor } from "../aggregates/vendor";

export abstract class VendorRepository {
    abstract find(vendor: VendorId): Promise<Vendor | null>
    abstract add(vendorName: string): Promise<Vendor>
    abstract save(vendor: Vendor): Promise<Vendor>
    abstract getIndex(): Promise<number>
}