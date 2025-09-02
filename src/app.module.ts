import { Module } from '@nestjs/common';
import { VendorService } from './vendor/application/vendor.service';
import { CartService } from './order-management/cart/application/cart.service';
import { OrderService } from './order-management/order/application/order.service';
import { OrderController } from './order-management/order/interfaces/order.controller';
import { CartController } from './order-management/cart/interfaces/cart.controller';
import { EventBus } from './event-bus/event-bus.service';
import { VendorModule } from './vendor/vendor.module';
import { CartModule } from './order-management/cart/cart.module';
import { OrderModule } from './order-management/order/order.module';

@Module({
  imports: [
    VendorModule,
    CartModule,
    OrderModule
  ],
  controllers: [
    OrderController,
    CartController
  ],
})
export class AppModule { }
