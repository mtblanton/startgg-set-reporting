import { ThemedLink } from "@/components/ThemedLink";
import { Card } from "@radix-ui/themes";
import Link from "next/link";

type EventCardProps = {
	name: string;
	id: number;
};

// TODO: Show the game name as well
export async function EventCard({ name, id }: EventCardProps) {
	return (
		<Card>
			<ThemedLink href={`/event/${id}`}>
				{name} {id}
			</ThemedLink>
		</Card>
	);
}
