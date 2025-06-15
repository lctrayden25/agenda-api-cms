import dbConnect from "@/server/config/dbConnect";
import { User } from "@/server/models";
import { userGetInput } from "../interfaces/userArgs.interface";
import { GraphQLErrorRes } from "@/server/utils/errors";
import { ApolloServerErrorCode } from "@apollo/server/errors";

const userQuery = {
	userList: async () => {
		await dbConnect();
		try {
			const result = await User.find();
			return result;
		} catch (error) {
			console.log(error);
		}
	},
	userGet: async (_parent: unknown, args: userGetInput) => {
		await dbConnect();
		try {
			const { id } = args as userGetInput;
			const result = await User.findById(id);
			if (!result) {
				return GraphQLErrorRes(
					"User not found",
					ApolloServerErrorCode.BAD_USER_INPUT,
					404
				);
			}
			return result;
		} catch (error) {
			console.log(error);
		}
	},
};

export default userQuery;
