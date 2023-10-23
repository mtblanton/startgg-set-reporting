import { gql } from "@/__generated__";

export const REPORT_SET = gql(`
	mutation ReportSet($setId: ID!, $winnerId: ID!) {
		reportBracketSet(setId: $setId, winnerId: $winnerId) {
			id
			state
		}
	}
`);
