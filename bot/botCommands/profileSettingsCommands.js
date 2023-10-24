import {collectionNames} from "../../core/config.js";
import {inlineKeyboardHiraganaCount, inlineKeyboardKatakanaCount,
    inlineKeyboardProfile,
    inlineKeyboardSettings
} from "../../markup/inlineKeyboards/inlineKeyboardProfile.js";
import formatUserInfo from "../../markup/formattedData/userFormatted.js";
import {profileNaming} from "../../markup/commandsNaming/profileNaming.js";

const userProfile = async (msg, bot, dbUsers) => {
    try {
        const userID = msg.message.chat.id;
        const messageID = msg.message.message_id;
        const userInfo = await dbUsers.getUser(userID, collectionNames.telegram)
        const userInfoFormatted = await formatUserInfo(userInfo)
        await bot.editMessageText(userInfoFormatted, {
            chat_id: userID,
            message_id: messageID,
            ...inlineKeyboardProfile
        })
    } catch (err) {
        console.log("Error:", err);
    }
}
const userSettingsProfile = async (msg, bot) => {
    try {
        const userID = msg.message.chat.id
        const messageID = msg.message.message_id

        await bot.editMessageText('Which settings would you like to change', {
            chat_id: userID,
            message_id: messageID,
            ...inlineKeyboardSettings
        })
    } catch (err) {
        console.log("Error:", err);
    }
}
const userSettingsLetterCount = async (msg, bot) => {
    try {
        const userID = msg.message.chat.id
        const messageID = msg.message.message_id
        const letterName = msg.data
        let inlineKeyboard;
        switch (letterName){
            case(profileNaming.katahira.hiragana.countLimit):
                inlineKeyboard = inlineKeyboardHiraganaCount
                break
            case(profileNaming.katahira.katakana.countLimit):
                inlineKeyboard = inlineKeyboardKatakanaCount
                break
        }
        await bot.editMessageText('Which count would you like to set?', {
            chat_id: userID,
            message_id: messageID,
            ...inlineKeyboard
        })
    } catch (err) {
        console.log("Error:", err);
    }
}
const userSetLetterCount = async (msg, bot, dbUsers) => {
    try {
        const userID = msg.message.chat.id
        const messageID = msg.message.message_id
        const countNumber = parseInt(msg.data.replace(/\D/g, ""))
        const inlineKeyboard = JSON.stringify(msg.message.reply_markup.inline_keyboard)
        let inlineKeyboardRes;
        let collectionName;
        switch (inlineKeyboard){
            case(JSON.stringify(inlineKeyboardHiraganaCount.reply_markup.inline_keyboard)):
                collectionName = collectionNames.hiragana
                inlineKeyboardRes = inlineKeyboardHiraganaCount
                break
            case(JSON.stringify(inlineKeyboardKatakanaCount.reply_markup.inline_keyboard)):
                collectionName = collectionNames.katakana
                inlineKeyboardRes = inlineKeyboardKatakanaCount
                break
        }
        await dbUsers.setLetterPractiseCount(userID, collectionNames.telegram, collectionName, countNumber)
        await bot.editMessageText(`${collectionName} count number was set to ${countNumber}`, {
            chat_id: userID,
            message_id: messageID,
            ...inlineKeyboardRes
        })
    } catch (err) {
        console.log("Error", err)
    }
}
export {userSettingsProfile, userSettingsLetterCount, userSetLetterCount, userProfile};