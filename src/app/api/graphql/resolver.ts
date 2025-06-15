import { agendaMutation, userMutation } from "@/app/api/graphql/mutation";
import { agendaQuery, userQuery } from "@/app/api/graphql/query";

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
