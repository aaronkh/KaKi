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

export type GetCouponsQueryVariables = Exact<{
  square_id: Scalars['String']['input'];
  firebase_token: Scalars['String']['input'];
}>;


export type GetCouponsQuery = { __typename?: 'Query', store?: { __typename?: 'Store', coupons_by_user: Array<{ __typename?: 'Coupon', square_id?: string | null, title: string, subtitle?: string | null, items: Array<{ __typename?: 'Item', square_id: string, name: string, description?: string | null, image?: string | null }> }> } | null };

export type GetStoresQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStoresQuery = { __typename?: 'Query', stores: Array<{ __typename?: 'Store', square_id: string, name: string }> };

export type UpsertUserMutationVariables = Exact<{
  user: UserInput;
}>;


export type UpsertUserMutation = { __typename?: 'Mutation', upsertUser?: { __typename?: 'User', firebase_token: string, name: string, interests: Array<string> } | null };

export type GetStoreQueryVariables = Exact<{
  square_id: Scalars['String']['input'];
}>;


export type GetStoreQuery = { __typename?: 'Query', store?: { __typename?: 'Store', name: string, suggested_items: Array<{ __typename?: 'Item', name: string, description?: string | null, status: ItemStatus, price: number, image?: string | null }>, inventory: Array<{ __typename?: 'Item', name: string, description?: string | null, status: ItemStatus, price: number, image?: string | null }>, views: Array<{ __typename?: 'User', firebase_token: string }> } | null };

export type UpsertViewMutationVariables = Exact<{
  store: StoreInput;
}>;


export type UpsertViewMutation = { __typename?: 'Mutation', upsertStore?: { __typename?: 'Store', views: Array<{ __typename?: 'User', interests: Array<string> }> } | null };


export const GetCouponsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCoupons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"square_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firebase_token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"store"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"square_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"square_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coupons_by_user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"firebase_token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firebase_token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"square_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"square_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCouponsQuery, GetCouponsQueryVariables>;
export const GetStoresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStores"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stores"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"square_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetStoresQuery, GetStoresQueryVariables>;
export const UpsertUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebase_token"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"interests"}}]}}]}}]} as unknown as DocumentNode<UpsertUserMutation, UpsertUserMutationVariables>;
export const GetStoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"square_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"store"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"square_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"square_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"suggested_items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"inventory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebase_token"}}]}}]}}]}}]} as unknown as DocumentNode<GetStoreQuery, GetStoreQueryVariables>;
export const UpsertViewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertView"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"store"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StoreInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertStore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"store"},"value":{"kind":"Variable","name":{"kind":"Name","value":"store"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"views"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"interests"}}]}}]}}]}}]} as unknown as DocumentNode<UpsertViewMutation, UpsertViewMutationVariables>;