import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import { merge } from 'lodash'
import { makeExecutableSchema } from '@graphql-tools/schema';

import { typedef as User, resolver as userResolver } from '../schema/User'
import { typedef as Item, resolver as itemResolver } from '../schema/Item'
import { typedef as Coupon, resolver as couponResolver } from '../schema/Coupon'
import { typedef as Store, resolver as storeResolver } from '../schema/Store'
import { Query, Mutation } from './api'
import knexInstance from './knex-instance';
import { authStore, getItem, createCheckout as _createCheckout, getCoupons, getItems, getStoreCoupons } from './square';

export const getStore = async square_id => (await knexInstance('stores').where('square_id', square_id).limit(1))[0]

const queryResolver = {
  'Query': {
    user: async (_, { firebase_token }) =>
      (await knexInstance('users').where('firebase_token', firebase_token).limit(1))[0]
    ,
    store: async (_, { square_id }) => {
      try {
        return await getStore(square_id)
      } catch (e) {
        console.log('store', square_id, e)
        return null
      }
    }
    ,
    coupon: async (_, { store_id, item_id }) =>
      (await getCoupons([store_id], [item_id]))[0]
    ,
    stores: () => knexInstance('stores').orderBy('name'),
    item: async (_, { store_id, item_id }) =>
      (await getItem(store_id, item_id)),
    helloWorld: () => {
      return 'Ack'
    }
  }
}

const mutationResolver = {
  'Mutation': {
    addCoupon: async (_, { firebase_token, store_id, square_id }) =>
      (await knexInstance('users')
        .returning('*')
        .where('firebase_token', firebase_token)
        .update({
          'coupons': knexInstance.raw(`array_append(coupons, ?)`, [store_id + '$' + square_id])
        }))[0]
    ,
    removeCoupon: async (_, { firebase_token, store_id, square_id }) =>
      (await knexInstance('users')
        .returning('*')
        .where('firebase_token', firebase_token)
        .update({
          'coupons': knexInstance.raw(`array_remove(coupons, ?)`, [store_id + '$' + square_id])
        }))[0]
    ,
    upsertUser: async (_, { user }) => {
      const defaultUser = {
        name: 'FirstName Lastname',
        coupons: [],
        interests: []
      }
      const dbUserRes = (await knexInstance('users').where('firebase_token', user.firebase_token).limit(1))
      if (dbUserRes.length) {
        user = { ...dbUserRes[0], ...user }
        return (await knexInstance('users').returning('*').where('firebase_token', user.firebase_token).update(user))[0]
      } else {
        user = { ...defaultUser, ...user }
        await knexInstance('users').insert(user)
        return user
      }
    },
    upsertStore: async (_, { store }) => {
      const dbStoreRes = (await knexInstance('stores').where('square_id', store.square_id).limit(1))
      if (dbStoreRes.length) {
        store = { ...dbStoreRes[0], ...store }
        return (await knexInstance('stores').returning('*').where('square_id', store.square_id).update(store))[0]
      } else {
        const defaultStore = {
          views: []
        }
        store = { ...defaultStore, ...store }
        await knexInstance('stores').insert(store)
        return store
      }
    },
    createCheckout: async (_, { sale: { store_id, amount } }) =>
      _createCheckout(store_id, amount)
    ,
    syncCoupons: async (_, { store_id }) => {
      const coupons = await getStoreCoupons(store_id)
      const couponByTag = {}
      const regex = /\[(.*?)\]/g
      for (const coupon of coupons) {
        const matches = coupon.title.matchAll(regex)
        for (const match of matches) {
          const [_, tag] = match
          if (!couponByTag[tag]) {
            couponByTag[tag] = []
          }
          couponByTag[tag].push(coupon.square_id)
        }
      }

      const allUsers = (await knexInstance('users')).map(u => ({
        ...u,
        interests: new Set(u.interests),
        coupons: new Set(u.coupons)
      }))
      for (const u of allUsers) {
        for (const tag in couponByTag) {
          if (u.interests.has(tag)) {
            for (const square_id of couponByTag[tag]) {
              u.coupons.add(store_id + '$' + square_id)
            }
          }
        }
      }
      const newUsers = allUsers.map(u => ({
        ...u,
        interests: Array.from(u.interests),
        coupons: Array.from(u.coupons)
      }))
      await knexInstance('users').insert(newUsers).onConflict(['firebase_token']).merge()
      return true
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, User, Item, Coupon, Store],
  resolvers: merge(
    queryResolver,
    mutationResolver,
    userResolver,
    itemResolver,
    couponResolver,
    storeResolver)
})

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true
})

export const oauthHandler = async ({ queryStringParameters: { code, state } }) => {
  const { square_id, url } = await authStore(code, state)
  const u = new URL(url)
  u.searchParams.append('square_id', square_id)
  return {
    statusCode: 200, headers: {
      'Content-Type': 'text/html'
    }, body: `<script>window.open('${u}', '_self'); window.close()</script>`
  }
}
export const gqlHandler = startServerAndCreateLambdaHandler(
  server, handlers.createAPIGatewayProxyEventRequestHandler(),
  {
    middleware: [
      event => {
        if (process.env.NODE_ENV !== 'production') {
          console.log('received ' + JSON.stringify(event.body))
        }
      }
    ]
  }
)