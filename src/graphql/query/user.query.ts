import dbConnect from "@/config/dbConnect";
import { User } from "@/models";
import { userGetInput } from "../interfaces/user.interface";

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
