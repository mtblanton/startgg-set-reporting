import { gql } from "@apollo/client";

export const GET_SETS_IN_EVENT = gql`
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
					id
					state
					fullRoundText
					round
					identifier
					hasPlaceholder
					slots {
						id
						slotIndex
						prereqType
						prereqId
						entrant {
							id
							name
							participants {
								id
								user {
									name
								}
							}
						}
					}
				}
			}
		}
	}
`;
