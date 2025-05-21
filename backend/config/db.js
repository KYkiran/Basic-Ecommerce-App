import mongoose from 'mongoose';

export const connectionDB=async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}