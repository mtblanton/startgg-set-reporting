"use client";

import { SetDetails } from "@/api/fragments/SetDetails";
import { useFragment } from "@apollo/experimental-nextjs-app-support/ssr";
import { PlayIcon } from "@radix-ui/react-icons";
import { Card, Flex } from "@radix-ui/themes";
import { ActivityState } from "../ActivityState";
import { isSetReady } from "../isSetReady";
import { SetSlot } from "../page";
import { Entrant } from "./Entrant";

type SetCardProps = {
	id: string;
};

export function SetCard({ id }: SetCardProps) {
	const { data } = useFragment({
		fragment: SetDetails,
		fragmentName: "SetDetails",
		from: {
			__typename: "Set",
			id,
		},
	});

	// @ts-expect-error gql codegen stuff
	if (!isSetReady(data)) {
		return null;
	}

	const { state, slots } = data;

	return (
		<Card>
			{state === ActivityState.ACTIVE && <PlayIcon />}
			<Flex gap="2">
				{/* @ts-expect-error this is definitely non-null when thsi gets here */}
				{slots.map((slot: SetSlot) => (
					<Entrant id={slot.id} key={slot.id} setId={id} />
				))}
			</Flex>
		</Card>
	);
}
