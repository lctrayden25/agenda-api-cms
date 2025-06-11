import { Agenda } from "@/models";
import { AgendaGetInput } from "../interfaces/agenda.interface";

const agendaQuery = {
	agendaList: async () => {
		const data = await Agenda.find();
		return data;
	},
	agendaGet: async (
		_parent: unknown,
		args: AgendaGetInput
		// _context: unknown,
		// _info: unknown
	) => {
		const { id } = args;
		const data = await Agenda.findOne({ _id: id });
		return data;
	},
};

export default agendaQuery;
