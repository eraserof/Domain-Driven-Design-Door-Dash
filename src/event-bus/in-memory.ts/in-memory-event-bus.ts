import { IEventBus } from "../interface/event-bus";

interface envet {
    [key: string]: Array<(object: any) => void>
}

export class InMemoryEventBus implements IEventBus {
    list: envet

    constructor() {
        this.list = {}
    }

    publish(event: string, object: any): void {
        let functions = this.list[event]
        for (let i = 0; i < functions.length; i++) {

            let func = functions[i]
            func(object)
        }
    }

    listen(event: string, callBack: (payload: any) => void): void {
        if (!this.list[event]) {
            this.list[event] = []
        }
        this.list[event].push(callBack)
    }

}