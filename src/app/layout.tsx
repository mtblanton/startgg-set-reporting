import { ApolloWrapper } from "@/api/wrapper";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { RefreshButton } from "./RefreshButton";

if (process.env.NODE_ENV !== "production") {
	// Adds messages only in a dev environment
	loadDevMessages();
	loadErrorMessages();
}

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ApolloWrapper>
					<RefreshButton />
					{children}
				</ApolloWrapper>
			</body>
		</html>
	);
}
