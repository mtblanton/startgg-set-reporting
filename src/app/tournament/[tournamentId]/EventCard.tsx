import Link from "next/link";

type EventCardProps = {
	name: string;
	id: number;
};

export async function EventCard({ name, id }: EventCardProps) {
	return (
		<>
			<Link href={`/event/${id}`}>
				{name} {id}
			</Link>
		</>
	);
}
