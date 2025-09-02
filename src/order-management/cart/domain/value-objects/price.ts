import { BaseValueObject } from "src/shared/base-value-object";

export class Price extends BaseValueObject<number> {
    constructor(price: number) {
        super(price)
    }

    static create(price: number) {
        if (price < 0) throw new Error(`Price cannot be less than zero`)
        return new Price(price)
    }
}