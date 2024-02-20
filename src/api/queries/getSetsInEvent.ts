import { gql } from "@/__generated__";
import { SetDetails } from "../fragments/SetDetails";

export const GET_SETS_IN_EVENT = gql(`
	query EventSets($eventId: ID!, $page: Int!, $perPage: Int!) {
		event(id: $eventId) {
			id
			name
			tournament {
				id
			}
			sets(page: $page, perPage: $perPage, sortType: STANDARD) {
				pageInfo {
					total
				}
				nodes {
					...SetDetails @nonreactive
				}
			}
		}
	}
`);
