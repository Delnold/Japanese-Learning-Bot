import TelegramBot from "node-telegram-bot-api";
import {Mutex} from "async-mutex";

import DBJapaneseAlphabet from "../db/dbJapaneseAlphabet.js";
import DBUsers from "../db/dbUsers.js";
import DBMongoCache from "../db/dbCache.js";
import {dbConnections} from "../core/dbMongoConnections.js";

import {userLetterTest, letterQuiz} from "./botCommands/practiseCommands.js";
import {mnemonicCharts, kanjiInfo} from "./botCommands/toolsCommands.js";
import {processCallbackQuery, processCommand} from "../utilities/utils.js";
import {
    startCommand,
    backCommand, toolsCommand, profileCommand, trainingCommand, lessonsCommand
} from "./botCommands/botCommands.js";
import { collectionNames, config
} from "../core/config.js";
import {userAttributes} from "../core/collectionAttributes/userAttributes.js";
import {backMenu, backMenuRegEx} from "../markup/commandsNaming/commandsNaming.js"
import {menuNaming} from "../markup/commandsNaming/menuNaming.js";
import {practiseNaming} from "../markup/commandsNaming/practiseNaming.js";
import {toolsNaming} from "../markup/commandsNaming/toolsNaming.js";
import {profileNaming} from "../markup/commandsNaming/profileNaming.js";
import {
    userSettingsProfile, userProfile, userSettingsLetterCount, userSetLetterCount,
} from "./botCommands/profileSettingsCommands.js";
import {
    inlineKeyboardHiraganaCount,
    inlineKeyboardKatakanaCount,
    inlineKeyboardSettings
} from "../markup/inlineKeyboards/inlineKeyboardProfile.js";
import DbLessons from "../db/dbLessons.js";
import {lessonsNaming} from "../markup/commandsNaming/lessonsNaming.js";
import lessonAttrs from "../core/collectionAttributes/lessonAttributes.js";
import {lessonChoice, lessonJLPT, lessonLevel, lessonNumber} from "./botCommands/lessonsCommands.js";

const bot = new TelegramBot(config.botToken, {polling: true});

const dbJapaneseAlphabet = new DBJapaneseAlphabet(dbConnections.JpAlphabet)
const dbUsers = new DBUsers(dbConnections.Users, userAttributes)
const dbLessons = new DbLessons(dbConnections.Lessons, lessonAttrs)
const dbMongoCache = new DBMongoCache(dbConnections.Cache)

const clientLock = new Mutex()

bot.onText(/\/start/, async (msg) => {
    try {
        await processCommand(msg, bot, startCommand, clientLock, dbMongoCache, collectionNames.commands, dbUsers)
    } catch (err) {
        console.log(err)
    }
})
bot.onText(menuNaming.practisingMenu.RegEx, async (msg) => {
    try {
        console.log(msg)
        await processCommand(msg, bot, trainingCommand, clientLock, dbMongoCache, collectionNames.commands)
    } catch (err) {
        console.log(err)
    }
})
bot.onText(backMenuRegEx, async (msg) => {
    console.log(msg)
    try {
        await processCommand(msg, bot, backCommand, clientLock, dbMongoCache, collectionNames.commands)
    } catch (err) {
        console.log(err)
    }
})
bot.onText(practiseNaming.katahira.RegExPrac, async (msg) => {
    try {
        await processCommand(msg, bot, userLetterTest, clientLock, dbMongoCache, collectionNames.commands, dbJapaneseAlphabet, dbUsers, dbMongoCache)
    } catch (err) {
        console.log(err)
    }
})

bot.onText(menuNaming.toolsMenu.RegEx, async (msg) => {
    try {
        console.log(msg)
        await processCommand(msg, bot, toolsCommand, clientLock, dbMongoCache, collectionNames.commands)
    } catch (err) {
        console.log(err)
    }
})
bot.onText(toolsNaming.kanjiInfo.RegEx, async (msg) => {
    try {
        await processCommand(msg, bot, kanjiInfo, clientLock, dbMongoCache, collectionNames.commands, dbJapaneseAlphabet, collectionNames.kanji)
    } catch (err) {
        console.log(err)
    }
});
bot.onText(lessonsNaming.lessonRegEx.lessonTypeRegEx, async (msg) => {
    try {
        await processCommand(msg, bot, lessonJLPT, clientLock, dbMongoCache, collectionNames.commands, dbLessons)
    } catch (err) {
        console.log(err)
    }
})
bot.onText(menuNaming.profileMenu.RegEx, async (msg) => {
    try {
        await processCommand(msg, bot, profileCommand, clientLock, dbMongoCache, collectionNames.commands, dbUsers)
    } catch (err) {
        console.log(err)
    }
})
bot.onText(toolsNaming.katahira.RegEx, async (msg) => {
    try {
        console.log(msg)
        await processCommand(msg, bot, mnemonicCharts, clientLock, dbMongoCache, collectionNames.commands)
    } catch (err) {
        console.log(err)
    }
})
bot.onText(menuNaming.lessonsMenu.RegEx, async (msg) => {
    try {
        await processCommand(msg, bot, lessonsCommand, clientLock, dbMongoCache, collectionNames.commands)
    } catch (err) {
        console.log(err)
    }
})

// Lessons Logic
bot.on('callback_query', async (msg) => {
    try {
        const messageData = msg.data
        switch (true){
            case lessonsNaming.lessonRegEx.lessonMatchJLPTRegEx.test(messageData):
                await processCallbackQuery(msg, lessonLevel, bot, dbLessons)
                break
            case lessonsNaming.lessonRegEx.lessonMatchLevelRegEx.test(messageData):
                await processCallbackQuery(msg, lessonNumber, bot, dbLessons)
                break
            case lessonsNaming.lessonRegEx.lessonMatchNumberRegEx.test(messageData):
                await processCallbackQuery(msg, lessonChoice,  bot, dbLessons)
                break
        }
    } catch (err) {
        console.log(err)
    }
})
// Practise commands
bot.on('callback_query', async (msg) =>
{
    try {
        const messageData = msg.data
        switch (true){
            case practiseNaming.katahira.RegExQuiz.test(messageData):
                await processCallbackQuery(msg, letterQuiz, bot, dbJapaneseAlphabet, dbMongoCache)
                break
        }
    } catch (err) {
        console.log(err)
    }
})

// Profile settings
bot.on('callback_query', async (msg) => {
    console.log(JSON.stringify(msg.message.reply_markup.inline_keyboard))
    try {
        switch (msg.data) {
            case profileNaming.profileSettings.name:
                await processCallbackQuery(msg, userSettingsProfile, bot)
                break
            case profileNaming.katahira.hiragana.countLimit:
            case profileNaming.katahira.katakana.countLimit:
                await processCallbackQuery(msg, userSettingsLetterCount, bot)
                break
        }
    } catch (err) {
        console.log(err)
    }
})

// Logic for settings
bot.on('callback_query', async (msg) => {
    try {
        if (msg.data !== backMenu) {
            console.log(msg)
            const keyboardLayout = JSON.stringify(msg.message.reply_markup.inline_keyboard)
            switch (keyboardLayout) {
                case JSON.stringify(inlineKeyboardHiraganaCount.reply_markup.inline_keyboard):
                case JSON.stringify(inlineKeyboardKatakanaCount.reply_markup.inline_keyboard):
                    await processCallbackQuery(msg, userSetLetterCount, bot, dbUsers)
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
                const keyboardLayout = JSON.stringify(msg.message.reply_markup.inline_keyboard)
                switch (keyboardLayout) {
                    case JSON.stringify(inlineKeyboardHiraganaCount.reply_markup.inline_keyboard):
                    case JSON.stringify(inlineKeyboardKatakanaCount.reply_markup.inline_keyboard):
                        await processCallbackQuery(msg, userSettingsProfile,  bot, dbUsers)
                        break
                    case JSON.stringify(inlineKeyboardSettings.reply_markup.inline_keyboard):
                        await processCallbackQuery(msg, userProfile, bot, dbUsers)
                        break
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
)


export default bot;

