import 'dotenv/config';
const dbConnectionString = process.env.CONNECTION_STRING_MONGODB
const botToken = process.env.TELEGRAM_BOT_TOKEN

const dbName = "Japanese_Alphabet";
const collectionHiraganaName = "Hiragana";
const collectionKatakanaName = "Katakana";
const collectionKanjiName = "Kanji";

export {dbConnectionString, botToken, dbName, collectionHiraganaName, collectionKatakanaName, collectionKanjiName}