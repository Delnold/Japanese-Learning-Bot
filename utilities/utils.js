import {backMenu} from "../markup/commandsNaming/commandsNaming.js";
import {backCommand} from "../bot/botCommands/botCommands.js";

async function processCommand(msg, bot, callback, clientLock, dbMongoCache, cacheCollectionName, ...callbackParams) {
    let release = await clientLock.acquire()
    const userID = msg.chat.id
    const messageID = msg.message_id
    const messageText = msg.text
    const currentActivity = {
        userID: userID
    }
    const dataActivityToAdd = {
        userID: userID,
        messageID: messageID,
        messageText: messageText
    }
    const dataActivityToUpdate = {
        $set: {
            messageID: messageID,
            messageText: messageText
        }
    }
    const currentState = await dbMongoCache.checkUserActivity(currentActivity, cacheCollectionName)
    if (currentState && messageText !== backMenu) {
        await dbMongoCache.updateUserActivity(currentActivity, dataActivityToUpdate, cacheCollectionName)
        release()
        await callback(msg, bot, ...callbackParams)
        return
    }
    if (currentState === false && messageText !== backMenu) {
        await dbMongoCache.addUserActivity(dataActivityToAdd, cacheCollectionName)
        release()
        await callback(msg, bot, ...callbackParams)
    } else {
        release()
        await backCommand(msg, bot, currentState, dbMongoCache, cacheCollectionName)
    }
}

async function processCallbackQuery(msg, callback, ...callbackParams) {
    await callback(msg, ...callbackParams)
}

async function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export {processCommand, processCallbackQuery, getRandomInt};