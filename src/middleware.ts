import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const middleware = async (request: Request) => {
	// Allow introspection queries for codegen
	const body = await request.clone().text();
	const isIntrospectionQuery =
		body.includes("__schema") || body.includes("__type");

	if (isIntrospectionQuery) {
		return NextResponse.next();
	}

	const cookiesStore = await cookies();
	const authToken = cookiesStore.get("authToken");

	if (!authToken) {
		return new Response(
			JSON.stringify({
				message: "Unauthorized",
			}),
			{
				status: 401,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}
	return NextResponse.next();
};

// Only run middleware on GraphQL API routes
export const config = {
	matcher: "/api/graphql",
};
