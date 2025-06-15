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
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n\tquery AgendaList($limit: Int, $offset: Int, $filter: AgendaFilter) {\n\t\tagendaList(limit: $limit, offset: $offset, filter: $filter) {\n\t\t\tid\n\t\t\tcode\n\t\t\tisActive\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tsession {\n\t\t\t\t\ttitle\n\t\t\t\t\tdescription\n\t\t\t\t}\n\t\t\t}\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tstartDate\n\t\t\tendDate\n\t\t}\n\t}\n": typeof types.AgendaListDocument,
    "\n\tquery AgendaListCount($limit: Int, $offset: Int, $filter: AgendaFilter) {\n\t\tagendaListCount(limit: $limit, offset: $offset, filter: $filter)\n\t}\n": typeof types.AgendaListCountDocument,
    "\n\tmutation UserLogin($data: UserLoginInput!) {\n\t\tuserLogin(data: $data) {\n\t\t\tid\n\t\t\tcreatedAt\n\t\t\temail\n\t\t\trole\n\t\t\tupdatedAt\n\t\t\tusername\n\t\t}\n\t}\n": typeof types.UserLoginDocument,
    "\n\tmutation UserLogout {\n\t\tuserLogout\n\t}\n": typeof types.UserLogoutDocument,
};
const documents: Documents = {
    "\n\tquery AgendaList($limit: Int, $offset: Int, $filter: AgendaFilter) {\n\t\tagendaList(limit: $limit, offset: $offset, filter: $filter) {\n\t\t\tid\n\t\t\tcode\n\t\t\tisActive\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tsession {\n\t\t\t\t\ttitle\n\t\t\t\t\tdescription\n\t\t\t\t}\n\t\t\t}\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tstartDate\n\t\t\tendDate\n\t\t}\n\t}\n": types.AgendaListDocument,
    "\n\tquery AgendaListCount($limit: Int, $offset: Int, $filter: AgendaFilter) {\n\t\tagendaListCount(limit: $limit, offset: $offset, filter: $filter)\n\t}\n": types.AgendaListCountDocument,
    "\n\tmutation UserLogin($data: UserLoginInput!) {\n\t\tuserLogin(data: $data) {\n\t\t\tid\n\t\t\tcreatedAt\n\t\t\temail\n\t\t\trole\n\t\t\tupdatedAt\n\t\t\tusername\n\t\t}\n\t}\n": types.UserLoginDocument,
    "\n\tmutation UserLogout {\n\t\tuserLogout\n\t}\n": types.UserLogoutDocument,
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
export function gql(source: "\n\tquery AgendaList($limit: Int, $offset: Int, $filter: AgendaFilter) {\n\t\tagendaList(limit: $limit, offset: $offset, filter: $filter) {\n\t\t\tid\n\t\t\tcode\n\t\t\tisActive\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tsession {\n\t\t\t\t\ttitle\n\t\t\t\t\tdescription\n\t\t\t\t}\n\t\t\t}\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tstartDate\n\t\t\tendDate\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery AgendaList($limit: Int, $offset: Int, $filter: AgendaFilter) {\n\t\tagendaList(limit: $limit, offset: $offset, filter: $filter) {\n\t\t\tid\n\t\t\tcode\n\t\t\tisActive\n\t\t\titems {\n\t\t\t\tid\n\t\t\t\tsession {\n\t\t\t\t\ttitle\n\t\t\t\t\tdescription\n\t\t\t\t}\n\t\t\t}\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\tstartDate\n\t\t\tendDate\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery AgendaListCount($limit: Int, $offset: Int, $filter: AgendaFilter) {\n\t\tagendaListCount(limit: $limit, offset: $offset, filter: $filter)\n\t}\n"): (typeof documents)["\n\tquery AgendaListCount($limit: Int, $offset: Int, $filter: AgendaFilter) {\n\t\tagendaListCount(limit: $limit, offset: $offset, filter: $filter)\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation UserLogin($data: UserLoginInput!) {\n\t\tuserLogin(data: $data) {\n\t\t\tid\n\t\t\tcreatedAt\n\t\t\temail\n\t\t\trole\n\t\t\tupdatedAt\n\t\t\tusername\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UserLogin($data: UserLoginInput!) {\n\t\tuserLogin(data: $data) {\n\t\t\tid\n\t\t\tcreatedAt\n\t\t\temail\n\t\t\trole\n\t\t\tupdatedAt\n\t\t\tusername\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation UserLogout {\n\t\tuserLogout\n\t}\n"): (typeof documents)["\n\tmutation UserLogout {\n\t\tuserLogout\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;