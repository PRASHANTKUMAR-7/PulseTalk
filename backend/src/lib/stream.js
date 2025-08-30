import {StreamChat} from "stream-chat";
import "dotenv/config";

const apiKey=process.env.STREAM_API_KEY;
const apiSecret=process.env.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.log("Stream API key or Secret is missing");
}

const streamClient=StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser=async (userData)=>{//if user exit then update if not then create
    try {
        await streamClient.upsertUsers([userData]);
        return userData;
    } catch (error) {
        console.error("Error upserting Strem user:",error);
    }
};

export const generateStreamToken = (userId)=>{};