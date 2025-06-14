import mongoose from "mongoose";

const agendaItemSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: false },
	},
	{ timestamps: false, versionKey: false }
);

const agendaSchema = new mongoose.Schema(
	{
		code: { type: String, required: true, unique: true },
		isActive: { type: Boolean, default: true },
		items: [agendaItemSchema],
		createdAt: { type: Date, default: () => new Date() },
		updatedAt: { type: Date, default: () => new Date() },
	},
	{ timestamps: false, versionKey: false }
);

const Agenda = mongoose.models.Agenda || mongoose.model("Agenda", agendaSchema);

export default Agenda;
