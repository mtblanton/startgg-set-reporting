import { getClient } from "@/api/client";
import { GET_EVENTS_IN_TOURNAMENT } from "@/api/queries/getEventsInTournament";
import Link from "next/link";
import { EventCard } from "./EventCard";

type TournamentPageProps = {
	params: {
		tournamentId: string;
	};
};

export default async function TournamentPage({
	params: { tournamentId },
}: TournamentPageProps) {
	const client = getClient();
	const { data } = await client.query<{
		tournament: {
			__typename: "Tournament";
			id: number;
			name: string;
			events: { __typename: "Event"; name: string; id: number }[];
		};
	}>({
		query: GET_EVENTS_IN_TOURNAMENT,
		variables: { tournamentId },
	});

	return (
		<div>
			{data.tournament.events.map((event) => (
				<EventCard name={event.name} id={event.id} key={event.id} />
			))}
		</div>
	);
}
