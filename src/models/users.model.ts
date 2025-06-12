import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		password: { type: String, required: true },
		role: { type: String, required: true, default: "admin" },
		email: { type: String, required: true },
		createdAt: { type: Date, default: () => new Date() },
		updatedAt: { type: Date, default: () => new Date() },
	},
	{ timestamps: false, versionKey: false }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
