import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, required: true, default: "admin" },
	email: { type: String, required: true, unique: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
