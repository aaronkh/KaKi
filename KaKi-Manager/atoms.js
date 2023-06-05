import { atom } from "recoil";

export const scannedItems = atom({
    key: 'scannedItems',
    default: []
})

export const scannedCoupons = atom({
    key: 'scannedCoupons',
    default: []
})

export const storeId = atom({
    key: 'storeId',
    default: ''
})