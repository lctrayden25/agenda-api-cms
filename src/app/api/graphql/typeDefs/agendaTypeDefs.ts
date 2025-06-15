import gql from "graphql-tag";

const agendaTypeDefs = gql`
	# Agenda
	input AgendaSessionInput {
		title: String!
		description: String!
	}

	input AgendaItemInput {
		session: [AgendaSessionInput!]
	}

	input AgendaCreateInput {
		code: String!
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

	input AgendaFilter {
		searchText: String
		isActive: Boolean
	}

	type AgendaSession {
		title: String!
		description: String!
	}

	type AgendaItem {
		id: ID
		session: [AgendaSession!]
	}

	type Agenda {
		id: ID!
		code: String!
		isActive: Boolean
		items: [AgendaItem!]
		createdAt: Date
		updatedAt: Date
		startDate: Date
		endDate: Date
	}

	type Query {
		agendaList(
			limit: Int = 10
			offset: Int = 0
			filter: AgendaFilter
		): [Agenda!]
		agendaListCount(
			limit: Int = 10
			offset: Int = 0
			filter: AgendaFilter
		): Int!
		agendaGet(id: ID!): Agenda
		agendaGetByCode(code: String!): Agenda
	}

	type Mutation {
		agendaCreate(data: AgendaCreateInput!): Agenda
		agendaUpdate(id: ID!, data: AgendaUpdateInput!): Agenda
		agendaDelete(id: ID!): Agenda
		agendaDeleteAll: Boolean
	}
`;

export default agendaTypeDefs;
