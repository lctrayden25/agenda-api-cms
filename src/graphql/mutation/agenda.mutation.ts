import { Agenda } from "@/models";
import {
	AgendaCreateInput,
	AgendaUpdateInput,
} from "../interfaces/agenda.interface";
import dbConnect from "@/config/dbConnect";
import { generateCode } from "@/utils/helper";
import { GraphQLError } from "graphql";

const agendaMutation = {
	agendaCreate: async (
		_parent: unknown,
		args: AgendaCreateInput
		// _context: unknown,
		// _info: unknown
	) => {
		await dbConnect();

		try {
			const randomCode = generateCode(7);
			const { items } = args.data as AgendaCreateInput["data"];
			console.log({ items });
			const data = await Agenda.insertOne({
				items,
				code: randomCode,
			});
			console.log({ data });

			return data;
		} catch (error) {
			console.log(error);
		}
	},
	agendaUpdate: async (_parent: unknown, args: AgendaUpdateInput) => {
		await dbConnect();
		try {
			const { id, data, isActive } = args as AgendaUpdateInput;
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
				{ $set: { items: data?.items, isActive, updatedAt: Date.now() } },
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
