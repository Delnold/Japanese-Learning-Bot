import 'dotenv/config';
const dbConnectionString = process.env.CONNECTION_STRING_MONGODB
const botToken = process.env.TELEGRAM_BOT_TOKEN

export {dbConnectionString, botToken}