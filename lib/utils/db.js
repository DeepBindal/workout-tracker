import mongoose from "mongoose";

let isConnected  = false;

export const connectToDb = async () => {
    mongoose.set("strictQuery", true);

    if (!process.env.MONGODB_URI) return console.log("Missing MongoDB URL");

    if(isConnected){
        console.log("Database already connected");
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("Database connection established");
    }catch(err){
        console.log(err);
    }
}