import { Vendor } from "src/vendor/domain/aggregates/vendor";
import { VendorRepository } from "src/vendor/domain/repositories/vendor.repository";
import { VendorId } from "src/vendor/domain/value-objects/vendor-id";

export class VendorRepositoryImpl implements VendorRepository {
    vendors: Vendor[]
    index = 1

    constructor() {
        // Add one or two vendors
        this.vendors = []
        this.index = 1
        this.vendors.push(Vendor.create('McDonalds', VendorId.create(this.index)))
        this.increamentIndex()
        this.vendors.push(Vendor.create('Walmart', VendorId.create(this.index)))
        this.increamentIndex()
    }

    increamentIndex() {
        this.index += 1
    }

    getIndex(): Promise<number> {
        let temp = this.index
        return new Promise((resolve) => {
            this.increamentIndex()
            resolve(temp)
        })
    }

    find(vendorId: VendorId): Promise<Vendor | null> {
        return new Promise((resolve) => {
            resolve(this.vendors.find((v) => v.vendorId === vendorId.toString()) || null)
        })
    }

    save(vendor: Vendor): Promise<Vendor> {
        this.vendors.push(vendor)
        let index = this.vendors.findIndex((v) => v.vendorId.equals(vendor.vendorId))
        if (index !== -1) {
            this.vendors.splice(index, 1, vendor)
        } else {
            this.vendors.push(vendor)
        }

        return new Promise((resolve) => {
            resolve(vendor)
        })
    }

    add(vendorName: string): Promise<Vendor> {
        let dupVendor = this.vendors.find((v) => v.name === vendorName)
        if (!dupVendor) throw new Error(`Vendor already exists`)
        let vendor = Vendor.create(vendorName, VendorId.create(this.index))
        this.increamentIndex()
        this.vendors.push(vendor)

        return new Promise((resolve) => {
            resolve(vendor)
        })
    }

}