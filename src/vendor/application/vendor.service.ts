import { Inject, Injectable } from "@nestjs/common";
import { VendorRepository } from "../domain/repositories/vendor.repository";
import { Vendor } from "../domain/aggregates/vendor";
import { VendorId } from "../domain/value-objects/vendor-id";
import { ItemNumber } from "src/order-management/cart/domain/value-objects/item-number";
import { VendorItemRepository } from "../domain/repositories/vendor-item.repository";
import { VendorItem } from "../domain/aggregates/vendorItem";

@Injectable()
export class VendorService {
    constructor(
        @Inject('VendorRepository') private readonly vendorRepo: VendorRepository,
        @Inject('VendorItemRepository') private readonly vendorItemRepo: VendorItemRepository
    ) { }

    async saveVendor(vendor: Vendor) {
        await this.vendorRepo.save(vendor)
    }

    async findVendor(id: VendorId): Promise<Vendor> {
        let vendor = await this.vendorRepo.find(id)
        if (!vendor) throw new Error(`Vendor not found`)
        return vendor
    }

    async saveVendorItem(vendorItem: VendorItem) {
        await this.vendorItemRepo.save(vendorItem)
    }

    async addItemToVendor(item: Omit<VendorItem, 'vendorItemId'>) {
        let index = await this.vendorItemRepo.getIndex()
        let vendorItem = await VendorItem.create(item.vendorId, item.price, item.inStock, ItemNumber.create(index))
        this.vendorItemRepo.add(vendorItem)
    }

    async getItem(item: ItemNumber, vendorId: VendorId): Promise<VendorItem> {
        let i = await this.vendorItemRepo.find(vendorId, item)
        if (!i) throw new Error(`Vendor does not have ${item}`)
        return i
    }

    async checkIfVendorHas(vendorItem: VendorItem, vendorId: VendorId) {
        let hasItem = false
        let item = await this.vendorItemRepo.find(vendorId, vendorItem.itemNumber)
        if (item && item.inStock > 0) hasItem = true
        return hasItem
    }

    async removeFromItemStock(itemNumber: ItemNumber, vendorId: VendorId, quantity: number) {
        if (quantity < 0) throw new Error(`quantity cannot be less than zero`)

        let item = await this.getItem(itemNumber, vendorId)
        if (!item) throw new Error(`item not found`)
        item.inStock -= quantity
        let quantityNotInStock = 0
        if (item.inStock < 0) {
            quantityNotInStock = Math.abs(item.inStock)
            item.inStock = 0
        }

        return quantityNotInStock
    }

    async addToStockVendorItem(vendorItem: VendorItem, quantity: number) {
        vendorItem.addToStock(quantity)
        await this.vendorItemRepo.save(vendorItem)
    }
}