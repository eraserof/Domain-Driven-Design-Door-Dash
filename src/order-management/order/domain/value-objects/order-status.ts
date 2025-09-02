import { BaseValueObject } from "src/shared/base-value-object";

export class OrderStatus extends BaseValueObject<string> {
    static PLACED = new OrderStatus('PLACED')
    static ACCEPTED = new OrderStatus('ACCEPTED')
    static PREPARED = new OrderStatus('PREPARED')
    static PICKEDUP = new OrderStatus('PICKEDUP')
    static DELIVERED = new OrderStatus('DELIVERED')
    static CANCELED = new OrderStatus('CANCELED')

    private constructor(status: string) {
        super(status)
    }

    static create(status: string) {
        switch (status.toUpperCase()) {
            case 'PLACED':
                return this.PLACED
            case 'ACCEPTED':
                return this.ACCEPTED
            case 'PREPARED':
                return this.PREPARED
            case 'PICKEDUP':
                return this.PICKEDUP
            case 'DELIVERED':
                return this.DELIVERED
            case 'CANCELED':
                return this.CANCELED
            default: throw new Error(`Invalid status: ${status}`)
        }
    }
}