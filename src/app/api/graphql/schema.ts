import gql from "graphql-tag";

const typeDefs = gql`
	scalar Date
	scalar JSON

	# type Error {
	# 	message: String
	# 	code: String
	# 	httpStatus: Int
	# 	timestamp: Date
	# }

	type AgendaItem {
		id: ID
		title: String!
		description: String!
	}

	input AgendaItemInput {
		title: String!
		description: String!
	}

	input AgendaCreateInput {
		isActive: Boolean
		startDate: Date
		endDate: Date
		items: [AgendaItemInput!]
	}

	input AgendaUpdateInput {
		isActive: Boolean
		startDate: Date
		endDate: Date
		items: [AgendaItemInput!]
	}

	type Agenda {
		id: ID!
		code: String
		isActive: Boolean
		items: [AgendaItem!]
		createdAt: Date
		updatedAt: Date
		startDate: Date
		endDate: Date
	}

	type Query {
		agendaList: [Agenda!]
		agendaGet(id: ID!): Agenda
	}

	type Mutation {
		agendaCreate(data: AgendaCreateInput!): Agenda
		agendaUpdate(id: ID!, data: AgendaUpdateInput!): Agenda
		agendaDelete(id: ID!): Agenda
		agendaDeleteAll: Boolean
	}
`;

export default typeDefs;
