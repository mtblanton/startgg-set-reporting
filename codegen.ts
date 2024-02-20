import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: [
		{
			"https://api.start.gg/gql/alpha": {
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_START_GG_AUTH_TOKEN}`,
				},
			},
		},
		// "./src/api/queries/schema.json",
	],
	// this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
	documents: ["src/**/*.{ts,tsx}"],
	generates: {
		"./src/__generated__/": {
			preset: "client",
			plugins: [],
			presetConfig: {
				gqlTagName: "gql",
			},
		},
	},
	ignoreNoDocuments: true,
};

export default config;
