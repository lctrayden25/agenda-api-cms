import {
	AgendaCreateInput,
	AgendaUpdateInput,
} from "../interfaces/agendaArgs.interface";

import { GraphQLError } from "graphql";
import dbConnect from "@/server/config/dbConnect";
import { Agenda } from "@/server/models";
import { GraphQLErrorRes } from "@/server/utils/errors";
import { ApolloServerErrorCode } from "@apollo/server/errors";

const agendaMutation = {
	agendaCreate: async (
		_parent: unknown,
		args: AgendaCreateInput
		// _context: unknown,
		// _info: unknown
	) => {
		await dbConnect();

		try {
			// const randomCode = generateCode(7);
			const { items, code } = args.data as AgendaCreateInput["data"];

			if (!code) {
				return GraphQLErrorRes(
					"Missing code input",
					ApolloServerErrorCode.BAD_USER_INPUT
				);
			}
			const data = await Agenda.insertOne({
				items,
				code: code,
			});

			return data;
		} catch (error) {
			console.log(error);
		}
	},
	agendaUpdate: async (_parent: unknown, args: AgendaUpdateInput) => {
		await dbConnect();
		try {
			const {
				id,
				data: { items },
				isActive,
			} = args as AgendaUpdateInput;
			const isExist = await Agenda.findOne({ _id: id });

			if (!isExist) {
				throw new GraphQLError("Agenda not found!", {
					extensions: {
						code: "NOT_FOUND",
						httpStatus: 404,
						timestamp: Date.now(),
					},
				});
			}
			console.log({ isExist: JSON.stringify(isExist, null, 2) });
			const result = await Agenda.findByIdAndUpdate(
				{ _id: id },
				{ $set: { items, isActive, updatedAt: Date.now() } },
				{ upsert: false }
			);

			return result;
		} catch (error) {
			console.log(error);
		}
	},
	agendaDelete: async (_parent: unknown, args: { id: string }) => {
		await dbConnect();
		try {
			const { id } = args;
			const data = await Agenda.deleteOne({ id: id });
			if (!data) {
				return GraphQLErrorRes(
					"Agenda not found",
					ApolloServerErrorCode.BAD_USER_INPUT,
					404
				);
			}
			return data;
		} catch (error) {
			console.log(error);
		}
	},
	agendaDeleteAll: async () => {
		await dbConnect();
		try {
			const data = await Agenda.deleteMany();
			return data.acknowledged;
		} catch (error) {
			console.log(error);
		}
	},
};

export default agendaMutation;
