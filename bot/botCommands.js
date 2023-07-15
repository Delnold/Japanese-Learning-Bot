import formatUserInfo from "../markup/formattedData/userFormatted.js";
import {collectionTelegramName} from "../core/config.js";

import {inlineKeyboardProfile, inlineKeyboardSettings} from "../markup/inlineKeyboards/inlineKeyboardProfile.js"
import selectKeyboardStart from "../markup/selectKeyboards/selectKeyboardStart.js";
import selectKeyboardTraining from "../markup/selectKeyboards/selectKeyboardTraining.js";
import selectKeyboardTools from "../markup/selectKeyboards/selectKeyboardTools.js";
const startCommand = async (msg, bot, dbUsers) => {
    const userInfo = msg.chat
    const userID = userInfo.id
    await dbUsers.addUser(userInfo, collectionTelegramName)
    await bot.sendMessage(userID,
        "Bot in development process, please have patience!!!", selectKeyboardStart);
}
const trainingCommand = async (msg, bot) => {
    const userID = msg.chat.id
    await bot.sendMessage(userID, "Choose your training session!", selectKeyboardTraining);
}
const toolsCommand = async (msg, bot) => {
    const userID = msg.chat.id
    await bot.sendMessage(userID, "Choose your tool!", selectKeyboardTools);
}
const profileCommand = async (msg, bot, dbUsers) => {
   try {
        const userID = msg.chat.id
        const userInfo = await dbUsers.getUser(userID, collectionTelegramName)
        const userInfoFormatted = await formatUserInfo(userInfo)
        await bot.sendMessage(userID, userInfoFormatted, inlineKeyboardProfile)
    } catch (err) {
        console.log("Error:", err);
    }
};
const backCommand = async (msg, bot) => {
    const userID = msg.chat.id
    await bot.sendMessage(userID, "Bot in development process, please have patience!!!", selectKeyboardStart);
}

export {startCommand, trainingCommand, backCommand, toolsCommand, profileCommand}