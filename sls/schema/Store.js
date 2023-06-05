import knexInstance from '../api/knex-instance'
import { getItems, getStoreCoupons } from '../api/square'

export const typedef = `
    type Store {
        name: String!, 
        geohash: String!,
        # For simplicity, each store represents a location
        square_id: String!,
        # A single merchant may have multiple locations, so reference them with this
        square_merchant_id: String!,
        views: [User!]!,

        # Let Square handle the following:
        suggested_items: [Item!]!,
        inventory: [Item!]!,
        coupons: [Coupon!]!,
        coupons_by_user(firebase_token: String!): [Coupon!]!,
    }

    input StoreInput {
        square_id: String!,
        name: String,
        views: [String!]
    }
`

export const resolver = {
    'Store': {
        name: async ({ square_id }) => (await knexInstance('stores').select('name').where('square_id', square_id).limit(1))[0].name,
        geohash: async ({ square_id }) => (await knexInstance('stores').select('geohash').where('square_id', square_id).limit(1))[0].geohash,
        inventory: async ({ square_id }) => {
            try {
                return await getItems(square_id)
            } catch (e) {
                return []
            }
        },
        suggested_items: async ({ square_id }) => {
            try {
                return (await getItems(square_id)).slice(0, 5)
            } catch (e) {
                return []
            }
        },
        coupons: async ({ square_id }) => {
            try {
                return await getStoreCoupons(square_id)
            } catch (e) {
                return []
            }
        },
        coupons_by_user: async ({ square_id }, { firebase_token }) => {
            try {
                const { coupons } = (await knexInstance('users').select('coupons').where('firebase_token', firebase_token).limit(1))[0]
                const cSet = new Set(coupons.filter(c => c.split('$')[0] === square_id).map(c => c.split('$')[1]))
                const cos = await getStoreCoupons(square_id)
                const cosIncSet = cos.filter(c => cSet.has(c.square_id))
                return cosIncSet
            } catch {
                return []
            }
        },
        views: async ({ views }) => {
            if (!views || !views.length) return []
            return await knexInstance('users')
                .whereRaw(`firebase_token IN (${[...views].map(_ => '?').join(',')})`, views)
        }
    }
}
