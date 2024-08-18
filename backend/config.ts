import { config } from 'dotenv';
config();

export const PORT = process.env.PORT || 8080; 

export const mongoDBURL = process.env.MONGODB_URI as string;
