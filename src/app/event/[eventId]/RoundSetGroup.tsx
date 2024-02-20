"use client";
import { Box, Flex, Text } from "@radix-ui/themes";
import { isValidActivityState, sortSetsByActivityState } from "./ActivityState";
import { SetCard } from "./SetCard";
import { Set } from "./page";

type SetGroupProps = {
	round: string;
	sets: Set[];
};

export function SetGroup({ round, sets }: SetGroupProps) {
	return (
		<Box key={round}>
			<Text>{round}</Text>
			<Flex gap="3" direction="column">
				{/* i bet i can filter in gql instead */}
				{sets
					.sort(sortSetsByActivityState)
					.filter((set) => isValidActivityState(set.state))
					.map((set) =>
						!set.hasPlaceholder ? (
							<SetCard
								state={set.state!}
								key={set.id}
								// @ts-ignore this type is annoying. maybe codegen is a mistake.
								slots={set.slots}
								id={set.id!}
							/>
						) : null,
					)}
			</Flex>
		</Box>
	);
}
