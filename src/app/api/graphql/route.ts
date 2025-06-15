import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import resolvers from "./resolver";
import agendaTypeDefs from "./typeDefs/agendaTypeDefs";
import userTypeDefs from "./typeDefs/userTypeDefs";
import baseTypeDefs from "./typeDefs/baseTypeDefs";

const server = new ApolloServer({
	typeDefs: [baseTypeDefs, agendaTypeDefs, userTypeDefs],
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
