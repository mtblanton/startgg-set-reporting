import { getClient } from "@/api/queries/client";
import { GET_EVENTS_IN_TOURNAMENT } from "@/api/queries/getEventsInTournament";
import Link from "next/link";
import { GET_SETS_IN_EVENT } from "@/api/queries/getSetsInEvents";
import { Entrant } from "./Entrant";
import { SetCard } from "./SetCard";
import { groupBy } from "lodash-es";
import { Fragment } from "react";

type TournamentPageProps = {
	params: {
		eventId: string;
	};
};

export type SetSlot = {
	__typename: "SetSlot";
	id: string;
	entrant: Entrant;
};

type Set = {
	__typename: "Set";
	id: string;
	state: number;
	hasPlaceholder: boolean;
	slots: SetSlot[];
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
		fetchPolicy: "no-cache",
	});

	const sets = data.event.sets.nodes;

	const filteredSets = sets.filter((set) => validStates.includes(set.state));
	console.log(filteredSets);
	const groupedSets = groupBy(filteredSets, (set) => ActivityState[set.state]);

	return (
		<div>
			{Object.entries(groupedSets).map(([state, sets]) => {
				return (
					<Fragment key={state}>
						{state}
						{sets.map((set) =>
							!set.hasPlaceholder ? (
								<SetCard
									state={set.state}
									key={set.id}
									slots={set.slots}
									id={set.id}
								/>
							) : null,
						)}
					</Fragment>
				);
			})}
		</div>
	);
}

enum ActivityState {
	// # Activity is created
	CREATED = 1,
	// # Activity is active or in progress
	ACTIVE = 2,
	// # Activity is done
	COMPLETED = 3,
	// # Activity is ready to be started
	READY = 4,
	// # Activity is invalid
	INVALID = 5,
	// # Activity, like a set, has been called to start
	CALLED = 6,
	// # Activity is queued to run
	QUEUED = 7,
}

const validStates = [
	ActivityState.ACTIVE,
	ActivityState.CALLED,
	ActivityState.QUEUED,
	ActivityState.READY,
	ActivityState.CREATED,
];
