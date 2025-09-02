import { Cart } from "../../domain/aggregates/cart";
import { CartRowDTO } from "../dto/cart-row.dto";
import { StringIdObject } from "src/shared/string-id-object";
import { CartStatus } from "../../domain/value-objects/cart-status";
import { VendorId } from "src/vendor/domain/value-objects/vendor-id";

export const CartRowMapper = {
    CartRowDTOToCart(cartDTO: CartRowDTO): Cart {
        return Cart.created(
            StringIdObject.create(cartDTO.cartId),
            VendorId.create(cartDTO.vendor),
            CartStatus.create(cartDTO.cartStatus),
            StringIdObject.create(cartDTO.customerId),
            cartDTO.cartTotal
        )
    },

    CartToCartRowDTO(cart: Cart): Omit<CartRowDTO, 'createAt' | 'updatedAt'> {
        return {
            cartId: cart.cartId.toString(),
            cartStatus: cart.cartStatus.toString(),
            customerId: cart.customerId.toString(),
            vendor: cart.vendor.toString(),
            cartTotal: cart.cartTotal || 0,
        }
    }

}

