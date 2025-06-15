import { Agenda } from "@/server/models";
import {
	AgendaGetInput,
	AgendaListArgs,
} from "../interfaces/agendaArgs.interface";
import dbConnect from "@/server/config/dbConnect";

const agendaQuery = {
	agendaList: async (_parent: unknown, args: AgendaListArgs) => {
		await dbConnect();
		try {
			const { limit = 10, offset = 0, filter } = args ?? {};
			const { searchText = "", isActive = true } = filter;
			console.log({ filter });
			const data = await Agenda.find({
				$and: [
					{
						$or: [
							{
								code: {
									$regex: searchText,
									$options: "i",
								},
							},
						],
					},
					{
						isActive: { $eq: isActive },
					},
				],
			})
				.skip(offset)
				.limit(limit);

			return data;
		} catch (error) {
			console.log(error);
		}
	},
	agendaListCount: async (_parent: unknown, args: AgendaListArgs) => {
		await dbConnect();
		try {
			const { limit = 10, offset = 0, filter } = args ?? {};
			const { searchText = "", isActive = true } = filter;
			const count = await Agenda.find({
				$and: [
					{
						$or: [
							{
								code: {
									$regex: searchText,
									$options: "i",
								},
							},
						],
					},
					{
						isActive: { $eq: isActive },
					},
				],
			}).countDocuments();

			return count;
		} catch (error) {
			console.log(error);
		}
	},
	agendaGet: async (
		_parent: unknown,
		args: AgendaGetInput
		// _context: unknown,
		// _info: unknown
	) => {
		await dbConnect();
		try {
			const { id } = args;
			const data = await Agenda.findOne({ _id: id });
			return data;
		} catch (error) {
			console.log(error);
		}
	},
	agendaGetByCode: async (_parent: unknown, args: { code: string }) => {
		await dbConnect();
		try {
			const { code } = args;
			const data = await Agenda.findOne({ code: code });
			return data;
		} catch (error) {
			console.log(error);
		}
	},
};

export default agendaQuery;
