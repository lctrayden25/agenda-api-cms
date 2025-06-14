import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "http://localhost:3000/app/api/graphql",
	documents: ["src/**/*.tsx"],
	generates: {
		"./src/__generated__/": {
			preset: "client",
			presetConfig: {
				gqlTagName: "gql",
			},
			plugins: ["typescript", "typescript-operations"],
		},
	},
	ignoreNoDocuments: true,
};

export default config;
