/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Coupon = {
  __typename?: 'Coupon';
  amount: Scalars['Int']['output'];
  conditions?: Maybe<Scalars['String']['output']>;
  items: Array<Item>;
  square_id?: Maybe<Scalars['String']['output']>;
  store: Store;
  subtitle?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type Item = {
  __typename?: 'Item';
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  square_id: Scalars['String']['output'];
  status: ItemStatus;
};

export enum ItemStatus {
  InStock = 'IN_STOCK',
  SoldOut = 'SOLD_OUT'
}

export type Mutation = {
  __typename?: 'Mutation';
  addCoupon?: Maybe<User>;
  createCheckout: Scalars['Boolean']['output'];
  removeCoupon?: Maybe<User>;
  syncCoupons: Scalars['Boolean']['output'];
  upsertStore?: Maybe<Store>;
  upsertUser?: Maybe<User>;
};


export type MutationAddCouponArgs = {
  firebase_token: Scalars['String']['input'];
  square_id: Scalars['String']['input'];
  store_id: Scalars['String']['input'];
};


export type MutationCreateCheckoutArgs = {
  sale: SaleInput;
};


export type MutationRemoveCouponArgs = {
  firebase_token: Scalars['String']['input'];
  square_id: Scalars['String']['input'];
  store_id: Scalars['String']['input'];
};


export type MutationSyncCouponsArgs = {
  store_id: Scalars['String']['input'];
};


export type MutationUpsertStoreArgs = {
  store: StoreInput;
};


export type MutationUpsertUserArgs = {
  user: UserInput;
};

export type Query = {
  __typename?: 'Query';
  coupon?: Maybe<Coupon>;
  helloWorld: Scalars['String']['output'];
  item?: Maybe<Item>;
  store?: Maybe<Store>;
  stores: Array<Store>;
  user?: Maybe<User>;
};


export type QueryCouponArgs = {
  item_id: Scalars['String']['input'];
  store_id: Scalars['String']['input'];
};


export type QueryItemArgs = {
  item_id: Scalars['String']['input'];
  store_id: Scalars['String']['input'];
};


export type QueryStoreArgs = {
  square_id: Scalars['String']['input'];
};


export type QueryUserArgs = {
  firebase_token: Scalars['String']['input'];
};

export type SaleInput = {
  amount: Scalars['Int']['input'];
  store_id: Scalars['String']['input'];
};

export type Store = {
  __typename?: 'Store';
  coupons: Array<Coupon>;
  coupons_by_user: Array<Coupon>;
  geohash: Scalars['String']['output'];
  inventory: Array<Item>;
  name: Scalars['String']['output'];
  square_id: Scalars['String']['output'];
  square_merchant_id: Scalars['String']['output'];
  suggested_items: Array<Item>;
  views: Array<User>;
};


export type StoreCoupons_By_UserArgs = {
  firebase_token: Scalars['String']['input'];
};

export type StoreInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  square_id: Scalars['String']['input'];
  views?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type User = {
  __typename?: 'User';
  coupons: Array<Coupon>;
  firebase_token: Scalars['String']['output'];
  interests: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type UserInput = {
  coupons?: InputMaybe<Array<Scalars['String']['input']>>;
  firebase_token: Scalars['String']['input'];
  interests?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GetStoreQueryVariables = Exact<{
  square_id: Scalars['String']['input'];
}>;


export type GetStoreQuery = { __typename?: 'Query', store?: { __typename?: 'Store', name: string, square_id: string, views: Array<{ __typename?: 'User', name: string, firebase_token: string, interests: Array<string> }> } | null };

export type CreateCheckoutMutationVariables = Exact<{
  sale: SaleInput;
}>;


export type CreateCheckoutMutation = { __typename?: 'Mutation', createCheckout: boolean };

export type CouponQueryVariables = Exact<{
  store_id: Scalars['String']['input'];
  item_id: Scalars['String']['input'];
}>;


export type CouponQuery = { __typename?: 'Query', coupon?: { __typename?: 'Coupon', square_id?: string | null, title: string, amount: number, subtitle?: string | null, items: Array<{ __typename?: 'Item', square_id: string }> } | null };

export type ItemQueryVariables = Exact<{
  store_id: Scalars['String']['input'];
  item_id: Scalars['String']['input'];
}>;


export type ItemQuery = { __typename?: 'Query', item?: { __typename?: 'Item', name: string, price: number, image?: string | null, square_id: string } | null };

export type SyncCouponsMutationVariables = Exact<{
  store_id: Scalars['String']['input'];
}>;


export type SyncCouponsMutation = { __typename?: 'Mutation', syncCoupons: boolean };


export const GetStoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"square_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"store"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"square_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"square_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"square_id"}},{"kind":"Field","name":{"kind":"Name","value":"views"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"firebase_token"}},{"kind":"Field","name":{"kind":"Name","value":"interests"}}]}}]}}]}}]} as unknown as DocumentNode<GetStoreQuery, GetStoreQueryVariables>;
export const CreateCheckoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCheckout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sale"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SaleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCheckout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sale"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sale"}}}]}]}}]} as unknown as DocumentNode<CreateCheckoutMutation, CreateCheckoutMutationVariables>;
export const CouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Coupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"store_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"store_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"store_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"item_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"item_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"square_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"square_id"}}]}}]}}]}}]} as unknown as DocumentNode<CouponQuery, CouponQueryVariables>;
export const ItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Item"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"store_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"store_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"store_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"item_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"item_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"square_id"}}]}}]}}]} as unknown as DocumentNode<ItemQuery, ItemQueryVariables>;
export const SyncCouponsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SyncCoupons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"store_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"syncCoupons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"store_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"store_id"}}}]}]}}]} as unknown as DocumentNode<SyncCouponsMutation, SyncCouponsMutationVariables>;