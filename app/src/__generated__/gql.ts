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
    "\nquery GetCoupons($square_id: String!, $firebase_token: String!) {\n  store(square_id: $square_id) {\n    coupons_by_user(firebase_token: $firebase_token) {\n      square_id\n      title\n      subtitle\n      items {\n        square_id\n        name\n        description\n        image\n      }\n    }\n  }\n}\n": types.GetCouponsDocument,
    "\nquery GetStores {\n  stores {\n      square_id\n      name\n  }\n}\n": types.GetStoresDocument,
    "\n  mutation UpsertUser($user: UserInput!) {\n    upsertUser(user: $user) {\n        firebase_token\n        name\n        interests\n    }\n  }\n": types.UpsertUserDocument,
    "\n  query GetStore($square_id: String!) {\n    store(square_id: $square_id) {\n      name\n      suggested_items {\n        name\n        description\n        status\n        price\n        image\n      }\n      inventory {\n        name\n        description\n        status\n        price\n        image\n      }\n      views {\n        firebase_token\n      }\n    }\n  }\n": types.GetStoreDocument,
    "\n  mutation UpsertView($store: StoreInput!) {\n    upsertStore(store: $store) {\n        views {\n            interests\n        }\n    }\n  }\n": types.UpsertViewDocument,
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
export function gql(source: "\nquery GetCoupons($square_id: String!, $firebase_token: String!) {\n  store(square_id: $square_id) {\n    coupons_by_user(firebase_token: $firebase_token) {\n      square_id\n      title\n      subtitle\n      items {\n        square_id\n        name\n        description\n        image\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery GetCoupons($square_id: String!, $firebase_token: String!) {\n  store(square_id: $square_id) {\n    coupons_by_user(firebase_token: $firebase_token) {\n      square_id\n      title\n      subtitle\n      items {\n        square_id\n        name\n        description\n        image\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetStores {\n  stores {\n      square_id\n      name\n  }\n}\n"): (typeof documents)["\nquery GetStores {\n  stores {\n      square_id\n      name\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpsertUser($user: UserInput!) {\n    upsertUser(user: $user) {\n        firebase_token\n        name\n        interests\n    }\n  }\n"): (typeof documents)["\n  mutation UpsertUser($user: UserInput!) {\n    upsertUser(user: $user) {\n        firebase_token\n        name\n        interests\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetStore($square_id: String!) {\n    store(square_id: $square_id) {\n      name\n      suggested_items {\n        name\n        description\n        status\n        price\n        image\n      }\n      inventory {\n        name\n        description\n        status\n        price\n        image\n      }\n      views {\n        firebase_token\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetStore($square_id: String!) {\n    store(square_id: $square_id) {\n      name\n      suggested_items {\n        name\n        description\n        status\n        price\n        image\n      }\n      inventory {\n        name\n        description\n        status\n        price\n        image\n      }\n      views {\n        firebase_token\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpsertView($store: StoreInput!) {\n    upsertStore(store: $store) {\n        views {\n            interests\n        }\n    }\n  }\n"): (typeof documents)["\n  mutation UpsertView($store: StoreInput!) {\n    upsertStore(store: $store) {\n        views {\n            interests\n        }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;