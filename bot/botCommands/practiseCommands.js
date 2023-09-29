import {
    collectionNames
} from "../../core/config.js";
import {
    practiseNaming
} from "../../markup/commandsNaming/practiseNaming.js"
import {
    hiraganaPathFolder,
    katakanaPathFolder,
} from "../../core/filePaths.js";
import openPhotoAsync from "../../utilities/fileCommands.js";
import {settingsAttributeName} from "../../core/collectionAttributes/userAttributes.js";
import {
    generateInlineKeyboardLetterQuiz,
} from "../../utilities/generateInlineKeyboards.js";
import {getRandomInt} from "../../utilities/utils.js";
import {ObjectId} from "mongodb";
import letterQuizResults from "../../markup/formattedData/practiseFormatted.js";

const userLetterTest = async (msg, bot, dbJapaneseAlphabet, dbUsers, dbMongoCache) => {
    try {
        const userID = msg.chat.id
        const user = await dbUsers.getUser(userID, collectionNames.telegram)
        let collectionName;
        let pathFolder;
        let collectionPrac;
        switch (msg.text) {
            case practiseNaming.katahira.hiragana.name:
                collectionName = collectionNames.hiragana
                pathFolder = hiraganaPathFolder
                collectionPrac = practiseNaming.katahira.hiragana.name
                break
            case practiseNaming.katahira.katakana.name:
                collectionName = collectionNames.katakana
                pathFolder = katakanaPathFolder
                collectionPrac = practiseNaming.katahira.katakana.name
        }

        const optionsCount = 4
        const collectionUserCount =
            parseInt(user[settingsAttributeName][`${collectionName}_practise_count`])
        const activity
            = await generateUserLetterTest(userID, optionsCount, collectionName, collectionUserCount, dbJapaneseAlphabet)
        const userTestActivityID
            = await dbMongoCache.addUserActivity(activity, collectionNames.letterPractise)
        const testArrayOfOptions = activity["testArrayOptions"]
        const optionsArrayCount = activity["testArrayAnswered"].length
        const inlineKeyboard =
            await generateInlineKeyboardLetterQuiz(testArrayOfOptions, optionsArrayCount, collectionPrac, userTestActivityID)
        const letterName = activity["testArrayQuestion"][0]
        const letterPhotoPath = `${pathFolder}${letterName}.png`
        const letterPhoto =
            await openPhotoAsync(letterPhotoPath)
        await bot.sendPhoto(userID, letterPhoto, inlineKeyboard);
    } catch (err) {
        console.log("Error:", err);
    }
};
const letterQuiz = async (msg, bot, dbJapaneseAlphabet, dbMongoCache) => {
    try {
        const userID = msg.message.chat.id
        const messageID = msg.message.message_id
        const messageData = msg.data
        const messageDataArray = messageData.split("_")
        const collectionPrac = messageDataArray[0]
        const userTestActivityID = messageDataArray[1]
        const userAnswer = messageDataArray[2]
        let collectionName;
        let pathFolder;
        switch (collectionPrac) {
            case (practiseNaming.katahira.hiragana.name):
                collectionName = collectionNames.hiragana
                pathFolder = hiraganaPathFolder
                break
            case (practiseNaming.katahira.katakana.name):
                collectionName = collectionNames.katakana
                pathFolder = katakanaPathFolder
                break
        }
        const dataActivity = {
            _id: new ObjectId(userTestActivityID)
        }
        const answerData = {
            $push:
                {
                    testArrayAnswered: userAnswer
                }
        }
        await dbMongoCache.updateUserActivity(dataActivity, answerData, collectionNames.letterPractise)
        const activity = await dbMongoCache.getUserActivity(dataActivity, collectionNames.letterPractise)
        const numberCount = activity["testCount"]
        const currentQuizState = activity["testArrayAnswered"]
        if (currentQuizState.length < numberCount) {
            const letterName = activity["testArrayQuestion"][currentQuizState.length]
            const testArrayOfOptions = activity["testArrayOptions"]
            const optionsArrayCount = activity["testArrayAnswered"].length
            const inlineKeyboard =
                await generateInlineKeyboardLetterQuiz(testArrayOfOptions, optionsArrayCount, collectionPrac, userTestActivityID)
            const letterPhotoPath = `${pathFolder}${letterName}.png`
            await bot.editMessageMedia({
                    type: 'photo',
                    media: "attach://" + letterPhotoPath
                }, {
                    chat_id: userID,
                    message_id: messageID,
                    ...inlineKeyboard
                }
            )
        } else {
            await dbMongoCache.deleteUserActivity(dataActivity, collectionNames.letterPractise)
            const resultFormatted = await letterQuizResults(activity)
            await bot.deleteMessage(userID, messageID)
            await bot.sendMessage(userID, resultFormatted, {parse_mode: 'Markdown'})

        }

    } catch (err) {
        console.log("Erorr:", err)
    }
}
const generateUserLetterTest = async (userID, optionsCount, collectionName, collectionUserCount, dbJapaneseAlphabet) => {
    let letterName = [];
    let letterEnglish = [];
    let arrayOfOptions = [];
    for (let i = 0; i < collectionUserCount; i++) {
        const arrayLetters =
            await dbJapaneseAlphabet.retrieveRandomCharacters(optionsCount, collectionName);
        const randomNumberChoice = await getRandomInt(optionsCount)
        const characterInfo = arrayLetters[randomNumberChoice]

        letterName.push(characterInfo.character)
        letterEnglish.push(characterInfo.english)
        arrayOfOptions.push(arrayLetters.map(obj => obj["english"]))
    }
    return {
        userID: userID,
        testName: collectionName,
        testCount: collectionUserCount,
        testArrayQuestion: letterName,
        testArrayOptions: arrayOfOptions,
        testArrayAnswers: letterEnglish,
        testArrayAnswered: []
    }

}
export {userLetterTest, letterQuiz};