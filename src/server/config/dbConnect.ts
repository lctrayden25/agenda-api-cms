import mongoose from "mongoose";
const MONGODB_URI = "mongodb://localhost:27017/agenda";

if (!MONGODB_URI) {
	throw new Error("Please define the MONGODB_URI environment variable");
}

/**
 * Cached connection for MongoDB.
 */
let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
	try {
		if (cached.conn) {
			return cached.conn;
		}

		if (!cached.promise) {
			cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
				return mongoose;
			});
		}
		cached.conn = await cached.promise;
		return cached.conn;
	} catch (error) {
		console.log("error: ", error);
	}
}

export default dbConnect;
