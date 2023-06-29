import TelegramBot from "node-telegram-bot-api";
import DBJapaneseAlphabet from "../db/dbJapaneseAlphabet.js";
import DBUsers from "../db/dbUsers.js";
import {dbJpAlphabet, dbUS} from "../core/dbMongoConnections.js";
import kanjiInfo from "./kanjiCommands.js";
import randomCharacters from "./lettersCommands.js";
import {startCommand, traningCommand, backCommand} from "./botCommands.js";
import {
    botToken,
    collectionHiraganaName,
    collectionKanjiName,
    collectionKatakanaName,
    collectionTelegramName
} from "../core/config.js";


const bot = new TelegramBot(botToken, {polling: true});
const dbJapaneseAlphabet = new DBJapaneseAlphabet(dbJpAlphabet)
const dbUsers = new DBUsers(dbUS)


bot.onText(/\/start/, async (msg) => {
    await startCommand(msg, bot);
})
bot.onText(/training/, async (msg) => {
    await traningCommand(msg, bot)
})
bot.onText(/back/, async (msg) => {
    await backCommand(msg, bot)
})
bot.onText(/hiragana|katakana/, async (msg) => {
    switch (msg.text) {
        case 'hiragana':
            await randomCharacters(msg, bot, dbJapaneseAlphabet, collectionHiraganaName)
            break
        case 'katakana':
            await randomCharacters(msg, bot, dbJapaneseAlphabet, collectionKatakanaName)
            break

    }
})
bot.onText(/register/, async (msg) => {
    await dbUsers.addUser(msg.chat, collectionTelegramName)
})
bot.onText(/Kanji (.+)/, async (msg, match) => {
    await kanjiInfo(msg, match, bot, dbJapaneseAlphabet, collectionKanjiName)
});


export default bot;

