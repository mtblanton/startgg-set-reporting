import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";
import { ComponentProps } from "react";
import { pick } from "lodash-es";

type RadixLinkProps = ComponentProps<typeof RadixLink>;
type ThemedLinkProps = NextLinkProps & RadixLinkProps;

export function ThemedLink(props: ThemedLinkProps): JSX.Element {
	const nextLinkProps = pick(props as NextLinkProps, [
		"href",
		"replace",
		"scroll",
		"prefetch",
	]);
	const radixLinkProps = pick(props as RadixLinkProps, [
		"size",
		"weight",
		"trim",
		"underline",
		"color",
		"highContrast",
	]);

	return (
		<RadixLink {...radixLinkProps} asChild>
			<NextLink {...nextLinkProps}>{props.children}</NextLink>
		</RadixLink>
	);
}
