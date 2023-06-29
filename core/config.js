import 'dotenv/config';
const clusterConnectionString = process.env.CONNECTION_STRING_MONGODB

const redisConnectionString = process.env.CONNECTION_STRING_REDIS
const botToken = process.env.TELEGRAM_BOT_TOKEN

const dbJapaneseAlphabet = "Japanese_Alphabet";
const dbUsers = "Users"

const collectionTelegramName = "Telegram"
const collectionHiraganaName = "Hiragana";
const collectionKatakanaName = "Katakana";
const collectionKanjiName = "Kanji";

export {redisConnectionString, clusterConnectionString, botToken, dbJapaneseAlphabet, dbUsers, collectionTelegramName, collectionHiraganaName, collectionKatakanaName, collectionKanjiName}