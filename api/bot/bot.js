import TelegramBot from 'node-telegram-bot-api'
import { BOT_TOKEN } from '../config/config.js'

const bot = new TelegramBot(BOT_TOKEN, { polling: true })

console.log('Telegram bot ishga tushdi!');


export default bot