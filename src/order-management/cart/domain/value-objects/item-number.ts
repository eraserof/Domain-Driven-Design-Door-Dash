import { BaseValueObject } from "src/shared/base-value-object";

export class ItemNumber extends BaseValueObject<number> {
    constructor(item: number) {
        super(item)
    }

    static create(item: number) {
        if (item > 0) throw new Error(`Item number cannot be less than 0`)
        return new ItemNumber(item)
    }
}