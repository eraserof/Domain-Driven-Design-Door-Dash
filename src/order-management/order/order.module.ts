import { Module, Provider } from "@nestjs/common";
import { OrderController } from "./interfaces/order.controller";
import { OrderService } from "./application/order.service";
import { InMemeoryOrderRepositoryImpl } from "./infrastructure/in-memory/in-memory-order.repository.impl";
import { EventBus } from "src/event-bus/event-bus.service";
import { CartService } from "../cart/application/cart.service";
import { CartModule } from "../cart/cart.module";
import { InMemoryEventBus } from "src/event-bus/in-memory.ts/in-memory-event-bus";

const InMemeoryOrderProvider: Provider = {
    provide: "OrderRepository",
    useClass: InMemeoryOrderRepositoryImpl
}

const EventBusProvider: Provider = {
    provide: "EventBus",
    useClass: InMemoryEventBus
}

@Module({
    imports: [
        CartModule
    ],
    controllers: [OrderController],
    providers: [
        OrderService,
        EventBusProvider,
        InMemeoryOrderProvider,
    ],
    exports: [
        OrderService,
        EventBusProvider,
        InMemeoryOrderProvider,
    ]
})

export class OrderModule { }