import { BaseValueObject } from "src/shared/base-value-object";

export class OrderId extends BaseValueObject<string> {

    private constructor(id: string) {
        super(id)
    }

    static create(id: string) {
        if (!id) throw new Error('Id cannot be null')
        return new OrderId(id)
    }
}