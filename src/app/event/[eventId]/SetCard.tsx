"use client";

import { useMutation } from "@apollo/client";
import { SetSlot } from "./page";
import { REPORT_SET } from "@/api/mutations/reportSet";

type SetCardProps = { slots: SetSlot[]; id: string; state: number };

export function SetCard({ slots, id, state }: SetCardProps) {
	const [reportSet, { data, loading, error }] = useMutation(REPORT_SET);

	if (slots.some((slot) => slot.entrant == null)) {
		return null;
	}

	return (
		<div>
			<strong>{id}</strong> {state}
			{slots.map((slot) => (
				<div key={slot.id}>
					<div>{slot.entrant.name}</div>
					<button>{slot.entrant.name} won</button>
				</div>
			))}
		</div>
	);
}
