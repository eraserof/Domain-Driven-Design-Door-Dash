import { Module, Provider } from "@nestjs/common";
import { VendorService } from "./application/vendor.service";
import { VendorRepositoryImpl } from "./infrastructure/in-memory/in-memory-vendor.repository.impl";
import { VendorItemRepositoryImpl } from "./infrastructure/in-memory/in-memory-vendor-item.repository.impl";

const InMemeoryVendorProvider: Provider = {
    provide: "VendorRepository",
    useClass: VendorRepositoryImpl
}

const InMemeoryVendorItemProvider: Provider = {
    provide: "VendorItemRepository",
    useClass: VendorItemRepositoryImpl
}

@Module({
    controllers: [],
    providers: [
        VendorService,
        InMemeoryVendorProvider,
        InMemeoryVendorItemProvider
    ],
    exports: [
        VendorService,
        InMemeoryVendorProvider,
        InMemeoryVendorItemProvider
    ]
})

export class VendorModule { }