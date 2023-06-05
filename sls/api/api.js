
export const Query = `
    type Query {
      user(firebase_token: String!): User,
      store(square_id: String!): Store,
      coupon(store_id: String!, item_id: String!): Coupon,
      stores: [Store!]!,
      item(store_id: String!, item_id: String!): Item,
      helloWorld: String! # Acks
    }
`

export const Mutation = `
  type Mutation {
    addCoupon(firebase_token: String!, store_id: String!, square_id: String!): User,
    removeCoupon(firebase_token: String!, store_id: String!, square_id: String!): User,
    upsertUser(user: UserInput!): User,
    upsertStore(store: StoreInput!): Store,
    syncCoupons(store_id: String!): Boolean!,
    createCheckout(sale: SaleInput!): Boolean!
  }

  input SaleInput {
    amount: Int!, 
    store_id: String!
  }
`