import gql from "graphql-tag";

const typeDefs = gql`
	scalar Date
	scalar JSON

	# Agenda
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

	type AgendaItem {
		id: ID
		title: String!
		description: String!
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

	# User
	input UserCreateInput {
		username: String!
		password: String!
		email: String!
	}

	input UserUpdateInput {
		username: String
		password: String
		email: String
	}

	type User {
		id: ID!
		username: String!
		email: String!
		role: String!
		createdAt: Date
		updatedAt: Date
	}

	# Query
	type Query {
		agendaList: [Agenda!]
		agendaGet(id: ID!): Agenda

		userList: [User!]
		userGet(id: ID!): User
	}

	# Mutation
	type Mutation {
		agendaCreate(data: AgendaCreateInput!): Agenda
		agendaUpdate(id: ID!, data: AgendaUpdateInput!): Agenda
		agendaDelete(id: ID!): Agenda
		agendaDeleteAll: Boolean

		userCreate(data: UserCreateInput!): User
		userUpdate(id: ID!, data: UserUpdateInput!): User
		userDelete(id: ID!): User
		userDeleteAll: Boolean
	}
`;

export default typeDefs;
