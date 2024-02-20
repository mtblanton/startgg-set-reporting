"use client";

import { GET_SETS_IN_EVENT } from "@/api/queries/getSetsInEvent";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Flex, Section } from "@radix-ui/themes";
import { groupBy } from "lodash-es";
import { Suspense } from "react";
import { isValidActivityState } from "./ActivityState";
import { Entrant } from "./components/Entrant";
import { SetGroup } from "./components/RoundSetGroup";
import { isSetReady } from "./isSetReady";

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

export type Set = {
	__typename: "Set";
	id: string;
	state: number;
	hasPlaceholder: boolean;
	slots: SetSlot[];
	fullRoundText: string;
};

export default function TournamentPage({
	params: { eventId },
}: TournamentPageProps) {
	const { data } = useSuspenseQuery(GET_SETS_IN_EVENT, {
		variables: { eventId, page: 1, perPage: 100 },
	});

	const sets = data.event?.sets?.nodes;

	if (sets == null) {
		return <div>No sets returned</div>;
	}

	const setsGroupedByRound = groupBy(
		sets as Set[],
		(set) => set?.fullRoundText,
	);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Flex direction="column">
				<Section size="1">
					{getEligibleSets(setsGroupedByRound).map(([round, sets]) => {
						return <SetGroup key={round} round={round} sets={sets} />;
					})}
				</Section>
			</Flex>
		</Suspense>
	);
}

function getEligibleSets(groupedSets: Record<string, Set[]>) {
	return Object.entries(groupedSets).filter(([_, sets]) =>
		sets.some((set) => isSetReady(set) && isValidActivityState(set.state)),
	);
}
