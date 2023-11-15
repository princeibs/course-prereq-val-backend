import { config } from "dotenv";

config()
export const configs = {
    NODE_ENV: process.env.NODE_ENV || '',
    PORT: process.env.PORT || '',
    APPLICATION_KEY: process.env.APPLICATION_KEY || '',
    DATABASE_URI: process.env.DATABASE_URI || ''
}