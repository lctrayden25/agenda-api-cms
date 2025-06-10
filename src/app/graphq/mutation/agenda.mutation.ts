import Agenda from "@/app/models/agendas.model";
import { AgendaCreateInput } from "../interfaces/agenda.interface";

const agendaMutation = {
	agendaCreate: async (
		_parent: unknown,
		args: AgendaCreateInput
		// _context: unknown,
		// _info: unknown
	) => {
		const { title, description } = args;
		const data = await Agenda.insertOne({
			title,
			description,
			code: `CODE${new Date().getTime()}`,
		});

		return data;
	},
	agendaUpdate: async (id: string) => {
		return `agendaUpdate: ${id}`;
	},
	agendaDelete: async (id: string) => {
		const data = await Agenda.deleteOne({ id: id });
		return data;
	},
	agendaDeleteAll: async () => {
		const data = await Agenda.deleteMany();
		return data.acknowledged;
	},
};

export default agendaMutation;
