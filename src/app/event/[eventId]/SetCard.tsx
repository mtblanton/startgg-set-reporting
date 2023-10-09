"use client";

import { Entrant } from "./Entrant";

type SetCardProps = { entrants: Entrant[]; id: string };

export function SetCard({ entrants, id }: SetCardProps) {
	return (
		<div>
			<strong>{id}</strong>
			{entrants.map((entrant) => (
				<div key={entrant.id}>
					{entrant.name} {entrant.id}
				</div>
			))}
		</div>
	);
}
