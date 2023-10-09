"use client";

import { SetSlot } from "./page";

type SetCardProps = { slots: SetSlot[]; id: string; state: number };

export function SetCard({ slots, id, state }: SetCardProps) {
	if (slots.some((slot) => slot.entrant == null)) {
		return null;
	}

	return (
		<div>
			<strong>{id}</strong> {state}
			{slots.map((slot) => (
				<div key={slot.id}>{slot.id}</div>
			))}
		</div>
	);
}
