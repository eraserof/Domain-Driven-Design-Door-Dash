import { BaseValueObject } from "src/shared/base-value-object";

export class CartStatus extends BaseValueObject<string> {
    static draftStatus = new CartStatus('DRAFT')
    static payedStatus = new CartStatus('PAYED')

    constructor(status: string) {
        super(status)
    }

    static create(status: string) {
        if (!status) throw new Error(`Status cannot be null`)
        switch (status.toUpperCase()) {
            case 'DRAFT':
                return this.draftStatus
            case 'PAYED':
                return this.payedStatus
            default:
                throw new Error(`Status not found`)
        }
    }
}