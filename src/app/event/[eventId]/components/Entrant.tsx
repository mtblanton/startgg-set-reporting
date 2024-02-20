import { SlotDetails } from "@/api/fragments/SlotDetails";
import { REPORT_SET } from "@/api/mutations/reportSet";
import { useMutation, useFragment } from "@apollo/client";
import { Card, Flex, Button, Text } from "@radix-ui/themes";

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
			</Flex>
		</Card>
	);
}
