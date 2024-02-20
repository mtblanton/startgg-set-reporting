"use client";

import { SlotDetails } from "@/api/fragments/SlotDetails";
import { REPORT_SET } from "@/api/mutations/reportSet";
import { useMutation, useFragment } from "@apollo/client";
import { Card, Flex, Button, Text } from "@radix-ui/themes";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useState } from "react";

export type Entrant = {
	__typename: "Entrant";
	id: number;
	name: string;
};
type EntrantProps = {
	id: string;
	setId: string;
};
export function Entrant({ id, setId }: EntrantProps) {
	const [reportSet] = useMutation(REPORT_SET);

	const { data } = useFragment({
		fragment: SlotDetails,
		fragmentName: "SlotDetails",
		from: { __typename: "SetSlot", id: id },
	});

	const [score, setScore] = useState<number | undefined>();

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
		<Card>
			<Flex direction="column" align="center">
				<Text size="3">{entrant?.name}</Text>
				<Button onClick={reportWinner}>{entrant?.name} won</Button>
				<ToggleGroup.Root
					type="single"
					value={score?.toString()}
					onValueChange={(score) => setScore(Number(score))}
				>
					<ToggleGroup.Item value="0">0</ToggleGroup.Item>
					<ToggleGroup.Item value="1">1</ToggleGroup.Item>
					<ToggleGroup.Item value="2">2</ToggleGroup.Item>
					<ToggleGroup.Item value="3">3</ToggleGroup.Item>
				</ToggleGroup.Root>
			</Flex>
		</Card>
	);
}
