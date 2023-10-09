import { gql } from "@apollo/client";

export const GET_SETS_IN_EVENT = gql`
	query EventSets($eventId: ID!, $page: Int!, $perPage: Int!) {
		event(id: $eventId) {
			id
			name
			sets(page: $page, perPage: $perPage, sortType: STANDARD) {
				pageInfo {
					total
				}
				nodes {
					id
					slots {
						id
						entrant {
							id
							name
						}
					}
				}
			}
		}
	}
`;
