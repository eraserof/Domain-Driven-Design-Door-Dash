import { BaseValueObject } from "src/shared/base-value-object";

export class VendorId extends BaseValueObject<number> {
    private constructor(id: number) {
        super(id)
    }

    static create(id: number) {
        if (!id) throw new Error('Vendor id cannot be null')
        return new VendorId(id)
    }
}