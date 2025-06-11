import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import typeDefs from "./schema";
import resolvers from "./resolver";

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
	context: async (req) => ({ req }),
});

// export { handler as GET, handler as POST };

export async function GET(req: NextRequest) {
	return await handler(req);
}

export async function POST(req: NextRequest) {
	return await handler(req);
}
