import { gql } from "@/__generated__";

export const SetDetails = gql(`
	fragment SetDetails on Set {
		id
		round
		slots {
			id
			...SlotDetails @nonreactive
		}
		startedAt
		totalGames
		state
		fullRoundText
	}
`);
