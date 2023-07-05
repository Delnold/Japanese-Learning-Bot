import TelegramBot from "node-telegram-bot-api";
import {Mutex} from "async-mutex";
import DBJapaneseAlphabet from "../db/dbJapaneseAlphabet.js";
import DBUsers from "../db/dbUsers.js";
import DBLevelCache from "../db/dbCache.js";
import {dbJpAlphabet, dbUS} from "../core/dbMongoConnections.js";
import dbLC from "../core/dbLevelConnections.js";
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
const dbLevelCache = new DBLevelCache(dbLC)
const clientLock = new Mutex()

bot.onText(/\/start/, async (msg) => {
    let release = await clientLock.acquire()
    if (await dbLevelCache.checkUserActivity(msg.from.id, msg.text)){
        release()
        return
    } await dbLevelCache.addUserActivity(msg.from.id, msg.text)
    release()

    await startCommand(msg, bot);
    await dbUsers.addUser(msg.chat, collectionTelegramName)

    await dbLevelCache.deleteUserActivity(msg.from.id)
})
bot.onText(/training/, async (msg) => {
    let release = await clientLock.acquire()
    if (await dbLevelCache.checkUserActivity(msg.from.id, msg.text)){
        release()
        return
    } await dbLevelCache.addUserActivity(msg.from.id, msg.text)
    release()

    await traningCommand(msg, bot)

    await dbLevelCache.deleteUserActivity(msg.from.id)


})
bot.onText(/back/, async (msg) => {
    let release = await clientLock.acquire()
    if (await dbLevelCache.checkUserActivity(msg.from.id, msg.text)){
        release()
        return
    } await dbLevelCache.addUserActivity(msg.from.id, msg.text)
    release()

    await backCommand(msg, bot)

    await dbLevelCache.deleteUserActivity(msg.from.id)

})
bot.onText(/hiragana|katakana/, async (msg) => {
    let release = await clientLock.acquire()
    if (await dbLevelCache.checkUserActivity(msg.from.id, msg.text)){
        release()
        return
    }await dbLevelCache.addUserActivity(msg.from.id, msg.text)
    release()

    switch (msg.text) {
        case 'hiragana':
            await randomCharacters(msg, bot, dbJapaneseAlphabet, collectionHiraganaName)
            break
        case 'katakana':
            await randomCharacters(msg, bot, dbJapaneseAlphabet, collectionKatakanaName)
            break

    }
    await dbLevelCache.deleteUserActivity(msg.from.id)
})
bot.onText(/register/, async (msg) => {
    let release = await clientLock.acquire()
    if (await dbLevelCache.checkUserActivity(msg.from.id, msg.text)){
        release()
        return
    }await dbLevelCache.addUserActivity(msg.from.id, msg.text)
    release()

    await dbUsers.addUser(msg.chat, collectionTelegramName)

    await dbLevelCache.deleteUserActivity(msg.from.id)

})
bot.onText(/Kanji (.+)/, async (msg, match) => {
    let release = await clientLock.acquire()
    if (await dbLevelCache.checkUserActivity(msg.from.id, msg.text)){
        release()
        return
    }await dbLevelCache.addUserActivity(msg.from.id, msg.text)
    release()

    await kanjiInfo(msg, match, bot, dbJapaneseAlphabet, collectionKanjiName)

    await dbLevelCache.deleteUserActivity(msg.from.id)

});


export default bot;

