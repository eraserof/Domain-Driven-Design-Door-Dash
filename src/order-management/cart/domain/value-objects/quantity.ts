import { BaseValueObject } from "src/shared/base-value-object";

export class QuantityObject extends BaseValueObject<number> {
    constructor(quantity: number) {
        super(quantity)
    }

    static create(quantity: number) {
        if (quantity < 0) throw new Error(`Quantity cannot be less than zero`)
        return new QuantityObject(quantity)
    }
}