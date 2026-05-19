import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("🚀 Good to go! MongoDB connected successfully");
    }
    catch (error) {
        console.log("Error in connecting to MongoDB", error);
        process.exit(1); //1 means failure

    }
};