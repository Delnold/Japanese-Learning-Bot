async function processCommand(msg, callback, clientLock, dbLevelCache, ...callbackParams){
    let release = await clientLock.acquire()
    if (await dbLevelCache.checkUserActivity(msg.from.id, msg.text)){
        release()
        return
    }await dbLevelCache.addUserActivity(msg.from.id, msg.text)
    release()

    await callback(msg, ...callbackParams)

    await dbLevelCache.deleteUserActivity(msg.from.id);
}
async function processCallbackQuery(msg, callback, clientLock, dbLevelCache, ...callbackParams){
    let release = await clientLock.acquire()
    if (await dbLevelCache.checkUserActivity(msg.message.chat.id, msg.data)){
        release()
        return
    }await dbLevelCache.addUserActivity(msg.message.chat.id, msg.data)
    release()

    await callback(msg, ...callbackParams)

    await dbLevelCache.deleteUserActivity(msg.message.chat.id);
}
export {processCommand, processCallbackQuery};