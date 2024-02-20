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
    "\n\tfragment SetDetails on Set {\n\t\tid\n\t\tround\n\t\tslots {\n\t\t\tid\n\t\t\t...SlotDetails @nonreactive\n\t\t}\n\t\tstartedAt\n\t\ttotalGames\n\t\tstate\n\t\tfullRoundText\n\t}\n": types.SetDetailsFragmentDoc,
    "\n\tfragment SlotDetails on SetSlot {\n\t\tslotIndex\n\t\tprereqType\n\t\tprereqId\n\t\tentrant {\n\t\t\tid\n\t\t  name\n\t\t}\n\t}\n": types.SlotDetailsFragmentDoc,
    "\n\tmutation ReportSet($setId: ID!, $winnerId: ID!) {\n\t\treportBracketSet(setId: $setId, winnerId: $winnerId) {\n\t\t\tid\n\t\t\tstate\n\t\t}\n\t}\n": types.ReportSetDocument,
    "\n\tquery EventsInTournament($tournamentId: ID!) {\n\t\ttournament(id: $tournamentId) {\n\t\t\tid\n\t\t\tname\n\t\t\tevents {\n\t\t\t\tname\n\t\t\t\tid\n\t\t\t\tvideogame {\n\t\t\t\t\tdisplayName\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.EventsInTournamentDocument,
    "\n\tquery EventSets($eventId: ID!, $page: Int!, $perPage: Int!) {\n\t\tevent(id: $eventId) {\n\t\t\tid\n\t\t\tname\n\t\t\ttournament {\n\t\t\t\tid\n\t\t\t}\n\t\t\tsets(page: $page, perPage: $perPage, sortType: STANDARD) {\n\t\t\t\tpageInfo {\n\t\t\t\t\ttotal\n\t\t\t\t}\n\t\t\t\tnodes {\n\t\t\t\t\t...SetDetails @nonreactive\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.EventSetsDocument,
    "\n\tquery TournamentsByOwner($perPage: Int!, $ownerId: ID!) {\n\t\ttournaments(query: { perPage: $perPage, filter: { ownerId: $ownerId } }) {\n\t\t\tnodes {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tslug\n\t\t\t}\n\t\t}\n\t}\n": types.TournamentsByOwnerDocument,
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
export function gql(source: "\n\tfragment SetDetails on Set {\n\t\tid\n\t\tround\n\t\tslots {\n\t\t\tid\n\t\t\t...SlotDetails @nonreactive\n\t\t}\n\t\tstartedAt\n\t\ttotalGames\n\t\tstate\n\t\tfullRoundText\n\t}\n"): (typeof documents)["\n\tfragment SetDetails on Set {\n\t\tid\n\t\tround\n\t\tslots {\n\t\t\tid\n\t\t\t...SlotDetails @nonreactive\n\t\t}\n\t\tstartedAt\n\t\ttotalGames\n\t\tstate\n\t\tfullRoundText\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment SlotDetails on SetSlot {\n\t\tslotIndex\n\t\tprereqType\n\t\tprereqId\n\t\tentrant {\n\t\t\tid\n\t\t  name\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment SlotDetails on SetSlot {\n\t\tslotIndex\n\t\tprereqType\n\t\tprereqId\n\t\tentrant {\n\t\t\tid\n\t\t  name\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation ReportSet($setId: ID!, $winnerId: ID!) {\n\t\treportBracketSet(setId: $setId, winnerId: $winnerId) {\n\t\t\tid\n\t\t\tstate\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation ReportSet($setId: ID!, $winnerId: ID!) {\n\t\treportBracketSet(setId: $setId, winnerId: $winnerId) {\n\t\t\tid\n\t\t\tstate\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery EventsInTournament($tournamentId: ID!) {\n\t\ttournament(id: $tournamentId) {\n\t\t\tid\n\t\t\tname\n\t\t\tevents {\n\t\t\t\tname\n\t\t\t\tid\n\t\t\t\tvideogame {\n\t\t\t\t\tdisplayName\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery EventsInTournament($tournamentId: ID!) {\n\t\ttournament(id: $tournamentId) {\n\t\t\tid\n\t\t\tname\n\t\t\tevents {\n\t\t\t\tname\n\t\t\t\tid\n\t\t\t\tvideogame {\n\t\t\t\t\tdisplayName\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery EventSets($eventId: ID!, $page: Int!, $perPage: Int!) {\n\t\tevent(id: $eventId) {\n\t\t\tid\n\t\t\tname\n\t\t\ttournament {\n\t\t\t\tid\n\t\t\t}\n\t\t\tsets(page: $page, perPage: $perPage, sortType: STANDARD) {\n\t\t\t\tpageInfo {\n\t\t\t\t\ttotal\n\t\t\t\t}\n\t\t\t\tnodes {\n\t\t\t\t\t...SetDetails @nonreactive\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery EventSets($eventId: ID!, $page: Int!, $perPage: Int!) {\n\t\tevent(id: $eventId) {\n\t\t\tid\n\t\t\tname\n\t\t\ttournament {\n\t\t\t\tid\n\t\t\t}\n\t\t\tsets(page: $page, perPage: $perPage, sortType: STANDARD) {\n\t\t\t\tpageInfo {\n\t\t\t\t\ttotal\n\t\t\t\t}\n\t\t\t\tnodes {\n\t\t\t\t\t...SetDetails @nonreactive\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery TournamentsByOwner($perPage: Int!, $ownerId: ID!) {\n\t\ttournaments(query: { perPage: $perPage, filter: { ownerId: $ownerId } }) {\n\t\t\tnodes {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tslug\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery TournamentsByOwner($perPage: Int!, $ownerId: ID!) {\n\t\ttournaments(query: { perPage: $perPage, filter: { ownerId: $ownerId } }) {\n\t\t\tnodes {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tslug\n\t\t\t}\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;