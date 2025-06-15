import dbConnect from "@/server/config/dbConnect";
import {
	UserCreateInput,
	UserLoginInput,
	UserUpdateInput,
} from "../interfaces/userArgs.interface";
import { User } from "@/server/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLErrorRes } from "@/server/utils/errors";

const userMutation = {
	userCreate: async (_parent: unknown, args: UserCreateInput) => {
		await dbConnect();
		try {
			const { email, username, password } =
				args.data as UserCreateInput["data"];

			const isExist = await User.findOne({ email });
			if (isExist) {
				return GraphQLErrorRes(
					"This email is existed already.",
					ApolloServerErrorCode.BAD_USER_INPUT,
					404
				);
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			if (!hashedPassword) {
				return GraphQLErrorRes(
					"Internal server error",
					ApolloServerErrorCode.BAD_REQUEST,
					502
				);
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
				return GraphQLErrorRes(
					"Invalid user id",
					ApolloServerErrorCode.BAD_USER_INPUT,
					404
				);
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
			const data = await User.findByIdAndDelete(id);
			if (!data) {
				return GraphQLErrorRes(
					"User not found",
					ApolloServerErrorCode.BAD_USER_INPUT,
					404
				);
			}
			return data;
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
				return GraphQLErrorRes(
					"Cannot find user with this email address",
					ApolloServerErrorCode.BAD_REQUEST,
					400
				);
			}

			const isMatch = await bcrypt.compare(password, user.password);
			console.log({ isMatch });
			if (!isMatch) {
				return GraphQLErrorRes(
					"Incorrect password",
					ApolloServerErrorCode.BAD_REQUEST,
					400
				);
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
