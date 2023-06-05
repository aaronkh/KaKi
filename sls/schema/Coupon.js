export const typedef = `
    type Coupon {
        # Square has discounts as special items in a store's catalog
        square_id: String,
        title: String!,
        amount: Int!,
        subtitle: String,
        conditions: String,
        items: [Item!]!,
        store: Store!
    }
`

export const resolver = { }