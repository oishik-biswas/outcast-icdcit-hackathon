import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

function connectToMongo() {
    if (!process.env.MONGODB_URI) {
        console.error("Error: MONGODB_URI is not defined in the environment variables.");
        process.exit(1); // Exit the process with failure
    }
    mongoose.connect(process.env.MONGODB_URI).then( () => {
        console.log("Connected to MongoDB");
    }).catch( err => console.log(err));

}

export default connectToMongo;