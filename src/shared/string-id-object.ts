import { BaseValueObject } from "./base-value-object";

export class StringIdObject extends BaseValueObject<string> {
    private constructor(id: string) {
        super(id)
    }

    static create(id: string) {
        if (!id) throw new Error('User Id cannot be null')
        return new StringIdObject(id)
    }
}