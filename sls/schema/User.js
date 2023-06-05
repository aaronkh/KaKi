import knexInstance from '../api/knex-instance'
import { getCoupons } from '../api/square'
export const typedef = `
    type User {
        firebase_token: String!,
        name: String!,
        
        # I'll leave invoices TODO since I don't want to deal with setting up connections in Apollo yet
        # invoices: (first: Int, after: String, last: Int, before: String): InvoiceConnection!,

        # String![] referencing coupons (stored as store-id$coupon-id)
        coupons: [Coupon!]!,
        interests: [String!]!
    }

    input UserInput {
        firebase_token: String!, 
        name: String,
        coupons: [String!],
        interests: [String!]
    }
`

export const resolver = {
    'User': {
        coupons: async ({ coupons }) => {
            try {
                return await getCoupons(coupons.map(c => c.split('$')[0]), coupons.map(c => c.split('$')[1]))
            } catch (e) {
                console.log(e)
                return []
            }
        }
    }
}