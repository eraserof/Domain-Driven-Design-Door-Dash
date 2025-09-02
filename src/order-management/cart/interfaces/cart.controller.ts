import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CartService } from "../application/cart.service";
import { CartResponseMapper } from "./mapper/cart-response.mapper";
import type { AddToCartDTO } from "./dto/add-to-cart.dto";
import { StringIdObject } from "src/shared/string-id-object";
import { VendorId } from "src/vendor/domain/value-objects/vendor-id";
import { ItemNumber } from "../domain/value-objects/item-number";

@Controller('cart')
export class CartController {

    constructor(private readonly cartService: CartService) { }

    @Get(':id')
    async getCart(@Param('id') id: string) {
        let cart = await this.cartService.getCart(id)
        let converted = cart ? CartResponseMapper.cartToCartResponseDTO(cart) : null
        return converted
    }

    @Post()
    async addToCart(@Body() add: AddToCartDTO) {
        await this.cartService.addToCart(StringIdObject.create(add.cartId), VendorId.create(add.vendorId), ItemNumber.create(add.itemNumber), add.quantity)

    }
}