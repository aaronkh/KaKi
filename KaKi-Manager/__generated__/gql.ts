/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nquery GetStore($square_id: String!) {\n  store(square_id: $square_id) {\n    name\n    square_id\n      views {\n      name\n      firebase_token\n      interests\n    }\n  }\n}\n": types.GetStoreDocument,
    "\nmutation CreateCheckout($sale: SaleInput!) {\n    createCheckout(sale: $sale)\n  }\n": types.CreateCheckoutDocument,
    "\nquery Coupon($store_id: String!, $item_id: String!) {\n    coupon(store_id: $store_id, item_id: $item_id) {\n        square_id\n        title\n        amount\n        subtitle\n        items {\n            square_id\n        }\n    }\n}\n": types.CouponDocument,
    "\nquery Item($store_id: String!, $item_id: String!) {\n    item(store_id: $store_id, item_id: $item_id) {\n        name\n        price\n        image \n        square_id\n    }\n}\n": types.ItemDocument,
    "\n    mutation SyncCoupons($store_id: String!) {\n        syncCoupons(store_id: $store_id)\n      }\n": types.SyncCouponsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetStore($square_id: String!) {\n  store(square_id: $square_id) {\n    name\n    square_id\n      views {\n      name\n      firebase_token\n      interests\n    }\n  }\n}\n"): (typeof documents)["\nquery GetStore($square_id: String!) {\n  store(square_id: $square_id) {\n    name\n    square_id\n      views {\n      name\n      firebase_token\n      interests\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateCheckout($sale: SaleInput!) {\n    createCheckout(sale: $sale)\n  }\n"): (typeof documents)["\nmutation CreateCheckout($sale: SaleInput!) {\n    createCheckout(sale: $sale)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Coupon($store_id: String!, $item_id: String!) {\n    coupon(store_id: $store_id, item_id: $item_id) {\n        square_id\n        title\n        amount\n        subtitle\n        items {\n            square_id\n        }\n    }\n}\n"): (typeof documents)["\nquery Coupon($store_id: String!, $item_id: String!) {\n    coupon(store_id: $store_id, item_id: $item_id) {\n        square_id\n        title\n        amount\n        subtitle\n        items {\n            square_id\n        }\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Item($store_id: String!, $item_id: String!) {\n    item(store_id: $store_id, item_id: $item_id) {\n        name\n        price\n        image \n        square_id\n    }\n}\n"): (typeof documents)["\nquery Item($store_id: String!, $item_id: String!) {\n    item(store_id: $store_id, item_id: $item_id) {\n        name\n        price\n        image \n        square_id\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation SyncCoupons($store_id: String!) {\n        syncCoupons(store_id: $store_id)\n      }\n"): (typeof documents)["\n    mutation SyncCoupons($store_id: String!) {\n        syncCoupons(store_id: $store_id)\n      }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;