"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: "http://localhost:3000/api/graphql",
	cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }: { children: React.ReactNode }) => (
	<ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ApolloClientProvider;
