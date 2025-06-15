import dbConnect from "@/server/config/dbConnect";
import { User } from "@/server/models";
import { userGetInput } from "../interfaces/userArgs.interface";

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
			return result;
		} catch (error) {
			console.log(error);
		}
	},
};

export default userQuery;
