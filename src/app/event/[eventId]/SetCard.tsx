"use client";

import { SlotFragment } from "@/api/fragments/Slot";
import { REPORT_SET } from "@/api/mutations/reportSet";
import { useMutation } from "@apollo/client";
import { useFragment } from "@apollo/experimental-nextjs-app-support/ssr";
import { SetSlot } from "./page";

type EntrantProps = {
	id: string;
	setId: number;
};

function Entrant({ id, setId }: EntrantProps) {
	const [reportSet] = useMutation(REPORT_SET);

	const { data } = useFragment({
		fragment: SlotFragment,
		fragmentName: "SlotDetails",
		from: { __typename: "SetSlot", id: id },
	});

	if (data.entrant == null) {
		return "No entrant";
	}

	// HACK: This is kinda janky. need to see if there's a better way to have this be typed correctly
	const entrant = data.entrant;

	const reportWinner = () => {
		if (entrant?.id != null) {
			reportSet({
				variables: {
					setId: setId.toString(),
					winnerId: entrant?.id,
				},
			});
		}
	};

	return (
		<div>
			<div>{entrant?.name}</div>
			<button onClick={reportWinner}>{entrant?.name} won</button>
		</div>
	);
}

type SetCardProps = { slots: SetSlot[]; id: number; state: number };
export function SetCard({ id, slots, state }: SetCardProps) {
	if (slots.some((slot) => slot.entrant == null)) {
		return null;
	}

	return (
		<div>
			<strong>{id}</strong> {state}
			{slots.map((slot) => (
				<Entrant id={slot.id} key={slot.id} setId={id} />
			))}
		</div>
	);
}
