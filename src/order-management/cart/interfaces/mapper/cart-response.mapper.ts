import { Cart } from "../../domain/aggregates/cart";
import { CartResponseDTO } from "../dto/cart-response.dto";

export const CartResponseMapper = {
    cartToCartResponseDTO(cart: Cart): CartResponseDTO {
        return {
            cartId: cart.cartId.toString(),
            cartStatus: cart.cartStatus.toString(),
            vendor: cart.vendor.toString(),
            cartTotal: cart.cartTotal
        }
    }
}