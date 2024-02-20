import { gql } from "@/__generated__";

export const SlotDetails = gql(`
	fragment SlotDetails on SetSlot {
		slotIndex
		prereqType
		prereqId
		entrant {
			id
		  name
		}
	}
`);
