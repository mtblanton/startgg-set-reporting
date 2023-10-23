"use client";

import { getClient } from "@/api/client";
import { GET_EVENTS_IN_TOURNAMENT } from "@/api/queries/getEventsInTournament";
import Link from "next/link";
import { GET_SETS_IN_EVENT } from "@/api/queries/getSetsInEvent";
import { Entrant } from "./Entrant";
import { SetCard } from "./SetCard";
import { groupBy } from "lodash-es";
import { Fragment } from "react";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

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

export default function TournamentPage({
	params: { eventId },
}: TournamentPageProps) {
	const { data, loading, error } = useQuery(GET_SETS_IN_EVENT, {
		variables: { eventId, page: 1, perPage: 100 },
		fetchPolicy: "no-cache",
	});

	if (loading) {
		return null;
	}

	if (error) return `Error! ${error}`;

	const sets = data.event?.sets?.nodes;

	if (sets == null) {
		return <div>No sets returned</div>;
	}

	const filteredSets = sets.filter(
		(set) => set != null && validStates.includes(set.state as number),
	) as NonNullable<(typeof sets)[number]>[];

	const groupedSets = groupBy(
		filteredSets,
		(set) => ActivityState[set!.state as number],
	);

	return (
		<div>
			{Object.entries(groupedSets).map(([state, sets]) => {
				return (
					<Fragment key={state}>
						{state}
						{filteredSets.map((set) =>
							!set.hasPlaceholder ? (
								<SetCard
									state={set.state!}
									key={set.id}
									// @ts-ignore this type is annoying. maybe codegen is a mistake.
									slots={set.slots}
									id={set.id!}
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
