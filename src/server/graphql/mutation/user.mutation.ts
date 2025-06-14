import dbConnect from "@/server/config/dbConnect";
import {
	UserCreateInput,
	UserLoginInput,
	UserUpdateInput,
} from "../interfaces/user.interface";
import { User } from "@/server/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const userMutation = {
	userCreate: async (_parent: unknown, args: UserCreateInput) => {
		await dbConnect();
		try {
			const { email, username, password } =
				args.data as UserCreateInput["data"];

			const isExist = await User.findOne({ email });
			if (isExist) {
				throw new Error("Email already exist");
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			if (!hashedPassword) {
				throw new Error("Error hashing password");
			}

			const newUser = await User.create({
				email,
				username,
				password: hashedPassword,
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
	userLogin: async (
		_parent: unknown,
		args: UserLoginInput
		// context: unknown
	) => {
		await dbConnect();
		try {
			const { email, password } = args.data as UserCreateInput["data"];
			const user = await User.findOne({ email });
			if (!user) {
				throw new Error("User not found");
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				throw new Error("Password is incorrect");
			}

			// create token
			const token = jwt.sign(
				{ userId: user._id },
				(process.env.JWT_SECRET || user._id).toString(),
				{
					expiresIn: "24h",
				}
			);

			const cookieStore = await cookies();
			cookieStore.set("authToken", token, {
				httpOnly: true,
				path: "/",
				sameSite: "strict",
				secure: process.env.NODE_ENV === "production",
				maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
			});

			return user;
		} catch (error) {
			console.log(error);
		}
	},
	userLogout: async () => {
		const cookieStore = await cookies();
		cookieStore.delete("authToken");
		return true;
	},
};

export default userMutation;
