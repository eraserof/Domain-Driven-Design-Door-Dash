
export interface IEventBus {
    publish<T>(event: string, object: T): void,
    on(event: string): void
}