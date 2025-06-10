import { agendaMutation, userMutation } from "@/app/graphql/mutation";
import { agendaQuery, userQuery } from "@/app/graphql/query";

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
