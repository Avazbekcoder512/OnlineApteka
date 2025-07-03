import { config } from 'dotenv'
config()

const DATABASE_URL = process.env.DATABASE_URL
const DIRECT_URL = process.env.DIRECT_URL
const PORT = process.env.PORT

export {
    DATABASE_URL, DIRECT_URL, PORT
}