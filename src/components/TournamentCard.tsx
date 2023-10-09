import Link from "next/link";
import { FC } from "react"

type TournamentCardProps = {
	name: string;
	id: number;
}

export const TournamentCard: FC<TournamentCardProps> = ({name, id}) => {
	return (
		<div>{name}: <Link href={`/tournament/${id}`}>{id}</Link></div>
	)
}