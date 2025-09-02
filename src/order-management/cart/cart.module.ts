import { Module, Provider } from "@nestjs/common";
import { CartController } from "./interfaces/cart.controller";
import { CartService } from "./application/cart.service";
import { CartRepositoryImpl } from "./infrastructure/in-memory/cart.repository.impl";
import { CartItemRepositoryImpl } from "./infrastructure/in-memory/cart-item.repository.impl";
import { VendorService } from "src/vendor/application/vendor.service";
import { VendorModule } from "src/vendor/vendor.module";

const InMemeoryCartProvider: Provider = {
    provide: "CartRepository",
    useClass: CartRepositoryImpl
}

const InMemeoryCartItemProvider: Provider = {
    provide: "CartItemRepository",
    useClass: CartItemRepositoryImpl
}

@Module({
    imports: [
        VendorModule
    ],
    controllers: [CartController],
    providers: [
        CartService,
        InMemeoryCartProvider,
        InMemeoryCartItemProvider
    ],
    exports: [
        CartService,
        InMemeoryCartProvider,
        InMemeoryCartItemProvider
    ]

})

export class CartModule { }