import { agendaMutation, userMutation } from "@/server/graphql/mutation";
import { agendaQuery, userQuery } from "@/server/graphql/query";

const resolvers = {
	Query: {
		...agendaQuery,
		...userQuery,
	},
	Mutation: {
		...agendaMutation,
		...userMutation,
	},
};

export default resolvers;
