import { BaseValueObject } from "src/shared/base-value-object";

export class UserId extends BaseValueObject<number> {
    private constructor(id: number) {
        super(id)
    }

    static create(id: number) {
        if (!id) throw new Error('User Id cannot be null')
        return new UserId(id)
    }
}