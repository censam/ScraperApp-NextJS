'use server';
import mongoose from "mongoose";

let isConnected = false; //track connection status

export const connectToDB =async () => {
    mongoose.set('strictQuery', true);//avoid insert unknown fields to db
     
    
    if(!process.env.MONGODB_URI){
        return console.log('MONGODB_URI is not defined in the config')
    }

    if(isConnected){
        return console.log('Using exisiting db connection');
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Error connecting to MongoDB',error);
    }
}