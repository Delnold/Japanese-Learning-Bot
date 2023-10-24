import formatUserInfo from "../../markup/formattedData/userFormatted.js";
import {collectionNames} from "../../core/config.js";
import {inlineKeyboardProfile} from "../../markup/inlineKeyboards/inlineKeyboardProfile.js"
import selectKeyboardStart from "../../markup/selectKeyboards/selectKeyboardStart.js";
import selectKeyboardTraining from "../../markup/selectKeyboards/selectKeyboardTraining.js";
import selectKeyboardTools from "../../markup/selectKeyboards/selectKeyboardTools.js";
import selectKeyboardLessons from "../../markup/selectKeyboards/selectKeyboardLessons.js";

const startCommand = async (msg, bot, dbUsers) => {
    const userInfo = msg.chat
    const userID = userInfo.id
    await dbUsers.addUser(userInfo, collectionNames.telegram)
    await bot.sendMessage(userID,
        "Bot in development process, please have patience!!!", selectKeyboardStart);
}
const trainingCommand = async (msg, bot) => {
    const userID = msg.chat.id
    await bot.sendMessage(userID, "Choose your training session!", selectKeyboardTraining);
}
const toolsCommand = async (msg, bot) => {
    const userID = msg.chat.id
    await bot.sendMessage(userID, "Choose your tools!", selectKeyboardTools);
}
const lessonsCommand = async (msg, bot) => {
    const userID = msg.chat.id
    await bot.sendMessage(userID, "Choose your lesson!", selectKeyboardLessons);
}
const profileCommand = async (msg, bot, dbUsers) => {
    try {
        const userID = msg.chat.id
        const userInfo = await dbUsers.getUser(userID, collectionNames.telegram)
        const userInfoFormatted = await formatUserInfo(userInfo)
        await bot.sendMessage(userID, userInfoFormatted, inlineKeyboardProfile)
    } catch (err) {
        console.log("Error:", err);
    }
};

const backCommand = async (msg, bot, currentState, dbMongoCache, cacheCollectionName) => {
    const userID = msg.chat.id
    const currentActivity = {
        userID: userID
    }
    if (currentState) {
        const getCurrentActivity = await dbMongoCache.getUserActivity(currentActivity, cacheCollectionName)
        const currentActivityOption = getCurrentActivity["messageText"]
        switch (currentActivityOption) {
            case currentActivityOption:
                if (await dbMongoCache.deleteUserActivity(currentActivity, cacheCollectionName)) {
                    await bot.sendMessage(userID, "Bot in development process, please have patience!!!", selectKeyboardStart);
                }
        }

    } else {
        await bot.sendMessage(userID, "Bot in development process, please have patience!!!", selectKeyboardStart);
    }
}

export {startCommand, trainingCommand, backCommand, toolsCommand, profileCommand, lessonsCommand}