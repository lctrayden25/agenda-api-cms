import gql from "graphql-tag";

const typeDefs = gql`
	type Agenda {
		id: ID!
		code: String
		title: String
		description: String
		createdAt: String
		updatedAt: String
	}

	type Query {
		agendaList: [Agenda]
		agendaGet(id: ID!): Agenda
	}

	type Mutation {
		agendaCreate(title: String!, description: String): Agenda
		agendaUpdate(id: ID!, title: String, description: String): Agenda
		agendaDelete(id: ID!): Agenda
		agendaDeleteAll: Boolean
	}
`;

export default typeDefs;
