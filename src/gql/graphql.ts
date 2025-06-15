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
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Agenda = {
  __typename?: 'Agenda';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  endDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  items?: Maybe<Array<AgendaItem>>;
  startDate?: Maybe<Scalars['Date']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type AgendaCreateInput = {
  code: Scalars['String']['input'];
  endDate?: InputMaybe<Scalars['Date']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  items?: InputMaybe<Array<AgendaItemInput>>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type AgendaItem = {
  __typename?: 'AgendaItem';
  id?: Maybe<Scalars['ID']['output']>;
  session?: Maybe<Array<AgendaSession>>;
};

export type AgendaItemInput = {
  session?: InputMaybe<Array<AgendaSessionInput>>;
};

export type AgendaSession = {
  __typename?: 'AgendaSession';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type AgendaSessionInput = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type AgendaUpdateInput = {
  endDate?: InputMaybe<Scalars['Date']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  items?: InputMaybe<Array<AgendaItemInput>>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  agendaCreate?: Maybe<Agenda>;
  agendaDelete?: Maybe<Agenda>;
  agendaDeleteAll?: Maybe<Scalars['Boolean']['output']>;
  agendaUpdate?: Maybe<Agenda>;
  userCreate?: Maybe<User>;
  userDelete?: Maybe<User>;
  userDeleteAll?: Maybe<Scalars['Boolean']['output']>;
  userLogin?: Maybe<User>;
  userLogout?: Maybe<Scalars['Boolean']['output']>;
  userUpdate?: Maybe<User>;
};


export type MutationAgendaCreateArgs = {
  data: AgendaCreateInput;
};


export type MutationAgendaDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAgendaUpdateArgs = {
  data: AgendaUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUserCreateArgs = {
  data: UserCreateInput;
};


export type MutationUserDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUserLoginArgs = {
  data?: InputMaybe<UserLoginInput>;
};


export type MutationUserUpdateArgs = {
  data: UserUpdateInput;
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  agendaGet?: Maybe<Agenda>;
  agendaGetByCode?: Maybe<Agenda>;
  agendaList?: Maybe<Array<Agenda>>;
  agendaListCount: Scalars['Int']['output'];
  userGet?: Maybe<User>;
  userList?: Maybe<Array<User>>;
};


export type QueryAgendaGetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAgendaGetByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QueryUserGetArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['Date']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  role: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  username: Scalars['String']['output'];
};

export type UserCreateInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type AgendaListQueryVariables = Exact<{ [key: string]: never; }>;


export type AgendaListQuery = { __typename?: 'Query', agendaList?: Array<{ __typename?: 'Agenda', id: string, code?: string | null, isActive?: boolean | null, createdAt?: any | null, updatedAt?: any | null, startDate?: any | null, endDate?: any | null, items?: Array<{ __typename?: 'AgendaItem', id?: string | null, session?: Array<{ __typename?: 'AgendaSession', title: string, description: string }> | null }> | null }> | null };

export type UserLoginMutationVariables = Exact<{
  data: UserLoginInput;
}>;


export type UserLoginMutation = { __typename?: 'Mutation', userLogin?: { __typename?: 'User', id: string, createdAt?: any | null, email: string, role: string, updatedAt?: any | null, username: string } | null };

export type UserLogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type UserLogoutMutation = { __typename?: 'Mutation', userLogout?: boolean | null };


export const AgendaListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AgendaList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agendaList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]} as unknown as DocumentNode<AgendaListQuery, AgendaListQueryVariables>;
export const UserLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<UserLoginMutation, UserLoginMutationVariables>;
export const UserLogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserLogout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userLogout"}}]}}]} as unknown as DocumentNode<UserLogoutMutation, UserLogoutMutationVariables>;