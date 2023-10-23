"use client";

import { useApolloClient } from "@apollo/client";

export function RefreshButton() {
	const client = useApolloClient();

	const refresh = () => {
		client.refetchQueries({ include: "active" });
	};

	return <button onClick={refresh}>Refresh</button>;
}
