import { Inject, Injectable } from "@nestjs/common";
import { CartRepository } from "../domain/repositories/cart.repository";
import { StringIdObject } from "src/shared/string-id-object";
import { VendorId } from "src/vendor/domain/value-objects/vendor-id";
import { ItemNumber } from "../domain/value-objects/item-number";
import { CartItemRepository } from "../domain/repositories/cart-Item.repository";
import { VendorService } from "src/vendor/application/vendor.service";
import { CartItem } from "../domain/aggregates/cartItem";
import { Cart } from "../domain/aggregates/cart";

@Injectable()
export class CartService {
    constructor(
        @Inject("CartRepository") private readonly cartRepo: CartRepository,
        @Inject("CartItemRepository") private readonly cartItemRepo: CartItemRepository,
        private readonly vendorService: VendorService,
    ) { }

    async getCart(id: string): Promise<Cart | null> {
        let cart = await this.cartRepo.find(StringIdObject.create(id))
        return cart
    }

    async getCartThrowError(id: string): Promise<Cart> {
        let cart = await this.getCart(id)
        if (!cart) throw new Error(`Cart not found`)
        return cart
    }

    async getCartWithIdObject(id: StringIdObject): Promise<Cart> {
        let cart = await this.cartRepo.find(id)
        if (!cart) throw new Error(`Cart not found`)
        return cart
    }

    /**
     * 
     * @param cartId The cart id 
     * @param itemNumber the id of the number in the cart
     * @returns the found CartItem, if not returns null. If you want to throw an error then check out getItemFromCartThrowError
     */
    async getItemFromCart(cartId: StringIdObject, itemNumber: ItemNumber): Promise<CartItem | null> {
        let cartItem = await this.cartItemRepo.findCartItem(cartId, itemNumber)
        return cartItem
    }

    /**
     * 
     * @param cartId The cart id 
     * @param itemNumber the id of the number in the cart
     * @returns CartItem if found, throws an error if not found
     */
    async getItemFromCartThrowError(cartId: StringIdObject, itemNumber: ItemNumber): Promise<CartItem> {
        let cartItem = await this.getItemFromCart(cartId, itemNumber)
        if (!cartItem) throw new Error(`Item is not in the cart`)
        return cartItem
    }

    /*
        find cart
        find vendoritem
        remove quantity wanted to buy from vendor inStock
        update the cartItem with new quantity
        save cart, cartItem, vendorItem.
    */
    async addToCart(cartId: StringIdObject, vendorId: VendorId, itemNumber: ItemNumber, quantity: number) {
        let cart = await this.getCartWithIdObject(cartId)
        if (!cart.canModifyCart()) throw new Error(`Cannot modify this cart.`)

        let vendorItem = await this.vendorService.getItem(itemNumber, vendorId)
        // 5 - 1 in stock | 4 left over. 4 - 5 / 1 in stock 
        let quantityLeftOver = await vendorItem.removeFromItemStock(quantity)
        let actualQuantityInCart = quantity
        if (quantityLeftOver > 0) actualQuantityInCart = quantityLeftOver - quantity

        let cartItem = await this.getItemFromCart(cartId, itemNumber)
        // if the item is already in the cart, update the cart with the new amount
        if (cartItem !== null) {
            cartItem.addToQuantity(quantity)
            this.cartRepo.save(cart)
        } else {
            this.cartItemRepo.save(CartItem.create(cartId, itemNumber, actualQuantityInCart))
        }

        this.vendorService.saveVendorItem(vendorItem)

        if (quantityLeftOver > 0) throw new Error(`Vendor does not have ${quantityLeftOver} in stock`)
        // We can also have a timeout where we add the amount back to the vendor if after 15 mins the user doesnt pay. 
        // if they pay for the items, then go ahead and commit the stock item changes.
        // then save the item to the cart
    }

    /*
        check if cart can be modified
        get item from cart
        delete the item from the CartItemRepo
        update the vendorItemRepo with the newly released quantities
    */
    async removeItemFromCart(cartId: StringIdObject, itemNumber: ItemNumber) {
        let cart = await this.getCartWithIdObject(cartId)
        if (!cart.canModifyCart()) throw new Error(`Cant modify the cart`)
        let item = await this.getItemFromCartThrowError(cartId, itemNumber)
        await this.cartItemRepo.delete(item)

        let vendorItem = await this.vendorService.getItem(itemNumber, cart.vendor)
        vendorItem.addToStock(item.quantity)
        this.vendorService.saveVendorItem(vendorItem)
    }

    /*
        reduce the item quantity from the cart
        update the vendorItem inStock value
        save cartItem repo
        save vendorItem repo
    */
    async reduceItemQuanityFromCart(cartId: string, itemNumber: ItemNumber, quantity: number) {
        let cart = await this.getCartThrowError(cartId)

        let cartItem = await this.getItemFromCartThrowError(cart.cartId, itemNumber)
        let vendorItem = await this.vendorService.getItem(itemNumber, cart.vendor)

        cartItem.reduceQuantity(quantity)

        vendorItem.addToStock(quantity)
        this.vendorService.saveVendorItem(vendorItem)
    }
}