import { gql } from "@/__generated__";

export const GET_TOURNAMENTS_BY_OWNER = gql(`
	query TournamentsByOwner($perPage: Int!, $ownerId: ID!) {
		tournaments(query: { perPage: $perPage, filter: { ownerId: $ownerId } }) {
			nodes {
				id
				name
				slug
			}
		}
	}
`);
