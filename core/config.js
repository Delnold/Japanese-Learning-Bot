import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const config = {
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    clusterConnectionString: process.env.CONNECTION_STRING_MONGODB
}
const dbNames = {
    japaneseAlphabet: "Japanese_Alphabet",
    users: "Users",
    lessons: "Lessons",
    cache: "Cache",
};
const collectionNames = {
    telegram: "Telegram",
    hiragana: "Hiragana",
    katakana: "Katakana",
    kanji: "Kanji",
    letterPractise: "Letter_Practise",
    commands: "Commands",
    grammar: "Grammar",
    vocabulary: "Vocabulary",
    basics: "Basics",
};
export {
    config, dbNames, collectionNames
}