import { StringIdObject } from "src/shared/string-id-object";
import { Cart } from "../../domain/aggregates/cart";
import { CartRepository } from "../../domain/repositories/cart.repository";
import { CartRowDTO } from "../dto/cart-row.dto";
import { CartRowMapper } from "../mapper/cart-row.mapper";


export class CartRepositoryImpl implements CartRepository {
    list: CartRowDTO[]

    constructor() {
        this.list = []
    }

    saveOrUpdate(cart: Cart) {
        let index = this.list.findIndex((c) => c.cartId === cart.cartId.toString())
        if (index !== -1) {
            let temp: CartRowDTO = {
                ...CartRowMapper.CartToCartRowDTO(cart),
                createAt: this.list[index].createAt,
                updatedAt: new Date().toISOString()
            }
            this.list[index] = temp
        } else {
            this.list.push({
                ...CartRowMapper.CartToCartRowDTO(cart),
                updatedAt: new Date().toISOString(),
                createAt: new Date().toISOString(),
                cartTotal: cart.cartTotal || 0,
            })
        }
    }

    exists(cart: Cart): Promise<Cart> {
        throw new Error("Method not implemented.");
    }

    find(cartId: StringIdObject): Promise<Cart | null> {
        let value = this.list.find((row) => row.cartId === cartId.toString())
        let convert = value ? CartRowMapper.CartRowDTOToCart(value) : null

        return new Promise((resolve) => {
            resolve(convert)
        })
    }

    save(cart: Cart): Promise<Cart> {
        this.list.push({
            ...CartRowMapper.CartToCartRowDTO(cart),
            updatedAt: new Date().toISOString(),
            createAt: new Date().toISOString(),
            cartTotal: cart.cartTotal || 0,
        })
        return new Promise((resolve) => {
            resolve(cart)
        })
    }

    delete(cartId: StringIdObject): Promise<boolean> {
        let completed = false
        let index = this.list.findIndex((cart) => cart.cartId === cartId.toString())
        if (index !== -1) {
            this.list.splice(index, 1)
            completed = true
        }

        return new Promise((resolve) => {
            resolve(completed)
        })
    }

}