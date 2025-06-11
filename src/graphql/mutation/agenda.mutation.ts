import { Agenda } from "@/models";
import { AgendaCreateInput } from "../interfaces/agenda.interface";
import dbConnect from "@/config/dbConnct";
import { generateCode } from "@/utils/helper";

const agendaMutation = {
	agendaCreate: async (
		_parent: unknown,
		args: AgendaCreateInput
		// _context: unknown,
		// _info: unknown
	) => {
		await dbConnect();

		const randomCode = generateCode(7);
		const { title, description } = args;
		const data = await Agenda.insertOne({
			title,
			description,
			code: randomCode,
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
