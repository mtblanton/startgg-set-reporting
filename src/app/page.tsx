import { getClient } from "@/api/client";
import { GET_TOURNAMENTS_BY_OWNER } from "@/api/queries/getTournamentsByOwner";
import { TournamentCard } from "@/components/TournamentCard";
import { Box, Container, Flex } from "@radix-ui/themes";
import { RefreshButton } from "./RefreshButton";
// import styles from "./page.module.css";

export default async function Home() {
	const client = getClient();
	const { data } = await client.query<{
		tournaments: {
			__typename: "Tournament";
			nodes: {
				__typename: "TournamentConnection";
				id: number;
				name: string;
				slug: string;
			}[];
		};
	}>({
		query: GET_TOURNAMENTS_BY_OWNER,
		variables: { perPage: 10, ownerId: process.env.TEST_OWNER_ID },
	});

	const tournamentNodes = data.tournaments.nodes;

	return (
		<main>
			<RefreshButton />
			{tournamentNodes.map((node) => (
				<TournamentCard name={node.name} id={node.id} key={node.id} />
			))}
		</main>
	);
}
