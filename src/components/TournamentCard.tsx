import { Card, Link, Text } from "@radix-ui/themes";
import { FC } from "react";
import { ThemedLink } from "./ThemedLink";

type TournamentCardProps = {
	name: string;
	id: number;
};

export const TournamentCard: FC<TournamentCardProps> = ({ name, id }) => {
	return (
		<Card>
			<Text>
				{name}: <ThemedLink href={`/tournament/${id}`}>{id}</ThemedLink>
			</Text>
		</Card>
	);
};
