"use client";

import { gql } from "@/__generated__";
import { ApolloLink, HttpLink } from "@apollo/client";
import { createFragmentRegistry } from "@apollo/client/cache";
import {
	ApolloNextAppProvider,
	NextSSRInMemoryCache,
	NextSSRApolloClient,
	SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { SlotDetails } from "./fragments/SlotDetails";
import { SetDetails } from "./fragments/SetDetails";

function makeClient() {
	const httpLink = new HttpLink({
		// this needs to be an absolute url, as relative urls cannot be used in SSR
		uri: process.env.NEXT_PUBLIC_START_GG_URL,
		// you can disable result caching here if you want to
		// (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
		fetchOptions: { cache: "no-store" },
		// you can override the default `fetchOptions` on a per query basis
		// via the `context` property on the options passed as a second argument
		// to an Apollo Client data fetching hook, e.g.:
		// const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_START_GG_AUTH_TOKEN}`,
		},
	});

	return new NextSSRApolloClient({
		connectToDevTools: true,
		// use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
		cache: new NextSSRInMemoryCache({
			fragments: createFragmentRegistry(SlotDetails, SetDetails),
		}),
		link:
			typeof window === "undefined"
				? ApolloLink.from([
						// in a SSR environment, if you use multipart features like
						// @defer, you need to decide how to handle these.
						// This strips all interfaces with a `@defer` directive from your queries.
						new SSRMultipartLink({
							stripDefer: true,
						}),
						httpLink,
					])
				: httpLink,
	});
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	);
}
