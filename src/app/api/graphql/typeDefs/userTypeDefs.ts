import gql from "graphql-tag";

const userTypeDefs = gql`
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

	input UserLoginInput {
		email: String!
		password: String!
	}

	type User {
		id: ID!
		username: String!
		email: String!
		role: String!
		createdAt: Date
		updatedAt: Date
	}

	type Query {
		userList: [User!]
		userGet(id: ID!): User
	}

	# Mutation
	type Mutation {
		userCreate(data: UserCreateInput!): User
		userUpdate(id: ID!, data: UserUpdateInput!): User
		userDelete(id: ID!): User
		userDeleteAll: Boolean
		userLogin(data: UserLoginInput): User
		userLogout: Boolean
	}
`;

export default userTypeDefs;
