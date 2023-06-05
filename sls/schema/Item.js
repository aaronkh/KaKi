import { getItemStock } from "../api/square"

export const typedef = `
    type Item {
        name: String!, 
        price: Int!, 
        status: ItemStatus!,
        description: String,
        image: String,
        square_id: String!
    }

    enum ItemStatus {
        IN_STOCK,
        SOLD_OUT
    }
`

export const resolver = {
    'Item': { // TODO: Get actual inventory from square
        status: ({ square_id }) => 'IN_STOCK'
    }
}
