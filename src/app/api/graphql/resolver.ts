import { agendaMutation, userMutation } from "@/graphql/mutation";
import { agendaQuery, userQuery } from "@/graphql/query";

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
