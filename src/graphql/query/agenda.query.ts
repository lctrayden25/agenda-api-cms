import { Agenda } from "@/models";
import { AgendaGetInput } from "../interfaces/agenda.interface";
import dbConnect from "@/config/dbConnect";

const agendaQuery = {
	agendaList: async () => {
		await dbConnect();
		try {
			const data = await Agenda.find();
			return data;
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
