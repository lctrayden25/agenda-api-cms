import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";

export const GraphQLErrorRes = (
	message: string,
	code: ApolloServerErrorCode = ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
	httpStatus: number = 502
) => {
	return new GraphQLError(message || "", {
		extensions: {
			code,
			httpStatus,
		},
	});
};
