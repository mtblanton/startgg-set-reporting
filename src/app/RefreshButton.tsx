"use client";

import { useApolloClient } from "@apollo/client";
import { Button } from "@radix-ui/themes";

export function RefreshButton() {
	const client = useApolloClient();

	const refresh = () => {
		client.refetchQueries({ include: "active" });
	};

	return <Button onClick={refresh}>Refresh</Button>;
}
