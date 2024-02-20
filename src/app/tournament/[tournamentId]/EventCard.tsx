import { Card } from "@radix-ui/themes";
import Link from "next/link";

type EventCardProps = {
	name: string;
	id: number;
};

export async function EventCard({ name, id }: EventCardProps) {
	return (
		<Card>
			<Link href={`/event/${id}`}>
				{name} {id}
			</Link>
		</Card>
	);
}
