import TelegramBot from "node-telegram-bot-api";
import fs from "fs";
import {botToken, dbConnectionString, collectionHiraganaName, collectionKatakanaName} from "../config/config.js";
import DBJapaneseAlphabet from "../DBContext/DBJapaneseAlphabet.js";
import DBMain from "../DBContext/DBMain.js";
import random_characters from "./hira_kataCommands.js";

const bot = new TelegramBot(botToken, {polling: true});
const dbInstance = new DBMain(dbConnectionString)

bot.onText(/\/hiragana|\/katakana/, async (msg, regex) => {
    console.log(regex)
    console.log(msg)
    switch (msg.text) {
        case '/hiragana':
            await random_characters(msg, bot, dbInstance, DBJapaneseAlphabet, collectionHiraganaName)
            break
        case '/katakana':
            await random_characters(msg, bot, dbInstance, DBJapaneseAlphabet, collectionKatakanaName)
            break

    }
})


export default bot;

