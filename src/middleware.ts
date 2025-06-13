import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const middleware = async () => {
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
