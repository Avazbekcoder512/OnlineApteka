import { config } from 'dotenv'
config()

const DATABASE_URL = process.env.DATABASE_URL
const DIRECT_URL = process.env.DIRECT_URL
const PORT = process.env.PORT
const JWT_KEY = process.env.JWT_KEY
const IS_PRODUCTION = process.env.IS_PRODUCTION === 'production'

export {
    DATABASE_URL, DIRECT_URL, PORT,
    JWT_KEY, IS_PRODUCTION
}