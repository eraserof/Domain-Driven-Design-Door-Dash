import { VendorId } from "../value-objects/vendor-id";

export class Vendor {

    private constructor(
        public name: string,
        public vendorId: VendorId,
    ) { }

    static create(name: string, id: VendorId) {
        return new Vendor(name, id)
    }
}