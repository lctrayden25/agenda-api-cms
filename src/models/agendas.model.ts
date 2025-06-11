import mongoose from "mongoose";

const agendaSchema = new mongoose.Schema(
	{
		code: { type: String, required: true, unique: true },
		title: { type: String, required: true },
		description: { type: String, required: false },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	},
	{ timestamps: false, versionKey: false }
);

const Agenda = mongoose.models.Agenda || mongoose.model("Agenda", agendaSchema);

export default Agenda;
