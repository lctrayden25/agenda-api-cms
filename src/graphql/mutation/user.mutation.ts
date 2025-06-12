import dbConnect from "@/config/dbConnect";
import { UserCreateInput, UserUpdateInput } from "../interfaces/user.interface";
import { User } from "@/models";

const userMutation = {
	userCreate: async (_parent: unknown, args: UserCreateInput) => {
		await dbConnect();
		try {
			const { email, username, password } =
				args.data as UserCreateInput["data"];

			const newUser = await User.create({
				email,
				username,
				password,
			});

			return newUser;
		} catch (error) {
			console.log(error);
		}
	},

	userUpdate: async (_parent: unknown, args: UserUpdateInput) => {
		await dbConnect();
		try {
			const { id, data } = args as UserUpdateInput;
			const { username, password, email, role } = data;

			const user = await User.findById(id);
			if (!user) {
				throw new Error("User not found");
			}

			const updatedUser = await User.findByIdAndUpdate(
				id,
				{ username, password, email, role },
				{ new: true }
			);
			return updatedUser;
		} catch (error) {
			console.log(error);
		}
	},

	userDelete: async (_parent: unknown, args: { id: string }) => {
		await dbConnect();
		try {
			const { id } = args;
			const deletedUser = await User.findByIdAndDelete(id);
			return deletedUser;
		} catch (error) {
			console.log(error);
		}
	},

	userDeleteAll: async () => {
		await dbConnect();
		try {
			const result = await User.deleteMany({});
			return result.acknowledged;
		} catch (error) {
			console.log(error);
		}
	},
};

export default userMutation;
