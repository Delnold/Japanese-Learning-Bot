import TelegramBot from "node-telegram-bot-api";
import {Mutex} from "async-mutex";

import DBJapaneseAlphabet from "../db/dbJapaneseAlphabet.js";
import DBUsers from "../db/dbUsers.js";
import DBLevelCache from "../db/dbCache.js";

import {dbJpAlphabet, dbUS} from "../core/dbMongoConnections.js";
import dbLC from "../core/dbLevelConnections.js";

import kanjiInfo from "./kanjiCommands.js";
import {randomCharacters, mnemonicCharts} from "./lettersCommands.js";
import {processCallbackQuery, processCommand} from "../utilities/utils.js";
import {
    startCommand,
    backCommand, toolsCommand, profileCommand, trainingCommand
} from "./botCommands.js";
import {
    botToken, collectionKanjiName, userAttributes,
} from "../core/config.js";
import {backMenu, backMenuRegEx} from "../markup/commandsNaming/commandsNaming.js"
import {
    practisingMenuRegEx, profileMenuRegEx,
    toolsMenuRegEx
} from "../markup/commandsNaming/menuNaming.js";
import {katahiraPracRegEx} from "../markup/commandsNaming/practisingNaming.js";
import {kanjiInfoRegEx, katahiraMnemonicChartRegEx} from "../markup/commandsNaming/toolsNaming.js";
import {hiraganaSettingsCount, katakanaSettingsCount, settingsProfile} from "../markup/commandsNaming/profileNaming.js";
import {
    userSettingsProfile, userProfile, userSettingsLetterCount, userSetLetterCount,
} from "./usersCommands.js";
import {
    inlineKeyboardHiraganaCount,
    inlineKeyboardKatakanaCount,
    inlineKeyboardSettings
} from "../markup/inlineKeyboards/inlineKeyboardProfile.js";

const bot = new TelegramBot(botToken, {polling: true});
const dbJapaneseAlphabet = new DBJapaneseAlphabet(dbJpAlphabet)
const dbUsers = new DBUsers(dbUS, userAttributes)
const dbLevelCache = new DBLevelCache(dbLC)
const clientLock = new Mutex()

bot.onText(/\/start/, async (msg) => {
    try {
        await processCommand(msg, startCommand, clientLock, dbLevelCache, bot, dbUsers)
    } catch (err) {
        console.log(err)
    }
})
bot.onText(practisingMenuRegEx, async (msg) => {
    try {
        console.log(msg)
        await processCommand(msg, trainingCommand, clientLock, dbLevelCache, bot)
    } catch (err) {
        console.log(err)
    }
})
bot.onText(backMenuRegEx, async (msg) => {
    try {
        await processCommand(msg, backCommand, clientLock, dbLevelCache, bot)
    } catch (err) {
        console.log(err)
    }
})
bot.onText(katahiraPracRegEx, async (msg) => {
    try {
        await processCommand(msg, randomCharacters, clientLock, dbLevelCache, bot, dbJapaneseAlphabet)
    } catch (err) {
        console.log(err)
    }
})

bot.onText(toolsMenuRegEx, async (msg) => {
    try {
        await processCommand(msg, toolsCommand, clientLock, dbLevelCache, bot)
    } catch (err) {
        console.log(err)
    }
})
bot.onText(kanjiInfoRegEx, async (msg) => {
    try {
        await processCommand(msg, kanjiInfo, clientLock, dbLevelCache, bot, dbJapaneseAlphabet, collectionKanjiName)
    } catch (err) {
        console.log(err)
    }
});

bot.onText(profileMenuRegEx, async (msg) => {
    try {
        await processCommand(msg, profileCommand, clientLock, dbLevelCache, bot, dbUsers)
    } catch (err) {
        console.log(err)
    }
})
bot.onText(katahiraMnemonicChartRegEx, async (msg) => {
    try {
        await processCommand(msg, mnemonicCharts, clientLock, dbLevelCache, bot)
    } catch (err) {
        console.log(err)
    }
})

// Profile settings
bot.on('callback_query', async (msg) => {
    try {
        switch(msg.data) {
            case settingsProfile:
                await processCallbackQuery(msg, userSettingsProfile, clientLock, dbLevelCache, bot)
                break
            case hiraganaSettingsCount:
            case katakanaSettingsCount:
                await processCallbackQuery(msg, userSettingsLetterCount, clientLock, dbLevelCache, bot)
                break
        }
    } catch (err) {
        console.log(err)
    }
})

// Logic for setting numbers
bot.on('callback_query', async(msg) => {
    try {
        if (msg.data != backMenu) {
            const keyboardLayout = JSON.stringify(msg.message.reply_markup.inline_keyboard)
            switch (keyboardLayout) {
                case JSON.stringify(inlineKeyboardHiraganaCount.reply_markup.inline_keyboard):
                case JSON.stringify(inlineKeyboardKatakanaCount.reply_markup.inline_keyboard):
                    console.log("I am here")
                    await processCallbackQuery(msg, userSetLetterCount, clientLock, dbLevelCache, bot, dbUsers)
                    break
            }
        }
    } catch (err) {
        console.log(err)
    }
})

// BackButton logic for InlineKeyboard
bot.on('callback_query', async (msg) => {
        try {
            if (msg.data === backMenu) {
                const keyboardLayout = msg.message.reply_markup.inline_keyboard.toString()
                switch (keyboardLayout) {
                    case inlineKeyboardHiraganaCount.reply_markup.inline_keyboard.toString():
                    case inlineKeyboardKatakanaCount.reply_markup.inline_keyboard.toString():
                        await processCallbackQuery(msg, userSettingsProfile, clientLock, dbLevelCache, bot, dbUsers)
                        break
                    case inlineKeyboardSettings.reply_markup.inline_keyboard.toString():
                        await processCallbackQuery(msg, userProfile, clientLock, dbLevelCache, bot, dbUsers)
                        break
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
)


export default bot;

