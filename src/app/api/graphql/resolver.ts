import { agendaMutation, userMutation } from "@/app/graphq/mutation";
import { agendaQuery, userQuery } from "@/app/graphq/query";

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
