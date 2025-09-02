

export interface IEventBus {
    publish(event: string, object: any): void,
    listen(event: string, callBack: (payload: any) => void): void
}