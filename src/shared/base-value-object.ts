
export abstract class BaseValueObject<T> {
    protected readonly props: T;
    constructor(props: T) {
        this.props = Object.freeze(props)
    }

    static create(props: any): any {
        throw new Error('method is not implemented')
    }

    toString(): any {
        return JSON.stringify(this.props);
    }

    equals(other?: BaseValueObject<T>): boolean {
        if (other === null || other === undefined) return false;
        if (other.props === undefined) return false;

        return JSON.stringify(this.props) === JSON.stringify(other.props)
    }
}