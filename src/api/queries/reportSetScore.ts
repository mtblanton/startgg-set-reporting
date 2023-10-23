import { gql } from "@/__generated__";
export const REPORT_SET_SCORE = gql(`
	mutation reportSet($setId: ID!, $winnerId: ID!) {
		reportBracketSet(setId: $setId, winnerId: $winnerId) {
			id
			state
		}
	}
`);
