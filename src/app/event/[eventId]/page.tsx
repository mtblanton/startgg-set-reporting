import { getClient } from "@/api/queries/client";
import { GET_EVENTS_IN_TOURNAMENT } from "@/api/queries/getEventsInTournament";
import Link from "next/link";
import { GET_SETS_IN_EVENT } from "@/api/queries/getSetsInEvents";
import { Entrant } from "./Entrant";
import { SetCard } from "./SetCard";
import objectGroupBy from "core-js/full/object/group-by";

type TournamentPageProps = {
	params: {
		eventId: string;
	};
};

type Set = {
	__typename: "Set";
	id: string;
	slots: {
		__typename: "SetSlot";
		id: string;
		entrant: Entrant;
	}[];
};

export default async function TournamentPage({
	params: { eventId },
}: TournamentPageProps) {
	const client = getClient();
	const { data } = await client.query<{
		event: {
			id: number;
			name: string;
			tournament: { __typename: "Tournament"; id: number };
			sets: {
				__typename: "SetConnection";
				pageInfo: { __typename: "PageInfo"; total: number };
				nodes: Set[];
			};
		};
	}>({
		query: GET_SETS_IN_EVENT,
		variables: { eventId, page: 1, perPage: 100 },
	});

	return (
		<div>
			{data.event.sets.nodes.map((set) => (
				<SetCard
					key={set.id}
					entrants={set.slots
						.filter(
							// TODO: Filter by status (ready, finished, not ready) instead of entrants being null
							(slot) => Object.hasOwn(slot, "entrant") && slot.entrant != null,
						)
						.map((entrantSlot) => entrantSlot.entrant)}
					id={set.id}
				/>
			))}
		</div>
	);
}
