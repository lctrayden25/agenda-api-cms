import agendaMutation from "@/app/graphq/mutation/agenda.mutation";
import userMutation from "@/app/graphq/mutation/user.mutation";
import agendaQuery from "@/app/graphq/query/agenda.query";
import userQuery from "@/app/graphq/query/user.query";

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
