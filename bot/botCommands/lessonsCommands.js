import {lessonsNaming} from "../../markup/commandsNaming/lessonsNaming.js";
import {collectionNames} from "../../core/config.js";
import {generateInlineKeyboard} from "../../utilities/generateInlineKeyboards.js";
import {JLPTAttributes, lessonsAttributes, levelsAttributes} from "../../utilities/generateLessonAttrsOptions.js";
import lessonAttrs from "../../core/collectionAttributes/lessonAttributes.js";
import {lessonFormatted} from "../../markup/formattedData/lessonFormatted.js";

const lessonJLPT = async (msg, bot, dbLessons) => {
    const userID = msg.chat.id
    const messageText = msg.text
    let collectionName;
    let inlineKeyboard;
    let arrayOfJLPTAttributes;
    let arrayForInlineKeyboard;
    switch (messageText) {
        case lessonsNaming.lessonType.grammar:
            collectionName = collectionNames.grammar
            break
        case lessonsNaming.lessonType.basics:
            collectionName = collectionNames.basics
            break
        case lessonsNaming.lessonType.kanji:
            collectionName = collectionNames.kanji
            break
        case lessonsNaming.lessonType.vocabulary:
            collectionName = collectionNames.vocabulary
            break
    }
    arrayOfJLPTAttributes = await
        dbLessons.getUniqueJLPT(collectionName)
    arrayForInlineKeyboard = await JLPTAttributes(collectionName,
        lessonAttrs.JLPT, arrayOfJLPTAttributes)
    inlineKeyboard = await generateInlineKeyboard(arrayForInlineKeyboard)
    await bot.sendMessage(userID, `Choose your ${collectionName} JLPT`, inlineKeyboard)
}
const lessonLevel = async (msg, bot, dbLessons) => {
    const userID = msg.message.chat.id
    const messageID = msg.message.message_id
    const messageData = msg.data
    // Grammar_JLPT_5
    const messageDataArr = messageData.split('_');

    let collectionName = messageDataArr[0]
    const JLPTAttributeValue = parseInt(messageDataArr[2]);

    const arrayOfLevelsAttributes = await dbLessons.getUniqueLevels(collectionName,
        JLPTAttributeValue)

    const arrayForInlineKeyboard = await levelsAttributes(collectionName,
        lessonAttrs.JLPT, JLPTAttributeValue, lessonAttrs.level, arrayOfLevelsAttributes)

    const inlineKeyboard = await generateInlineKeyboard(arrayForInlineKeyboard)

    await bot.editMessageText('Which level would you like to choose?', {
        chat_id: userID,
        message_id: messageID,
        ...inlineKeyboard
    })

}
const lessonNumber = async (msg, bot, dbLessons) => {
    const userID = msg.message.chat.id
    const messageID = msg.message.message_id
    const messageData = msg.data
    // Grammar_JLPT_5_Level_23
    const messageDataArr = messageData.split('_');

    let collectionName = messageDataArr[0]
    const JLPTAttributeValue = parseInt(messageDataArr[2]);
    const levelAttributeValue = parseInt(messageDataArr[4])

    const arrayOfLessonsAttributes = await dbLessons.getUniqueLessons(collectionName,
        JLPTAttributeValue, levelAttributeValue)


    const arrayForInlineKeyboard = await lessonsAttributes(collectionName,
        lessonAttrs.JLPT, JLPTAttributeValue, lessonAttrs.level, levelAttributeValue,
        lessonAttrs.lesson, lessonAttrs.info, arrayOfLessonsAttributes)

    const inlineKeyboard = await generateInlineKeyboard(arrayForInlineKeyboard)

    await bot.editMessageText('Which lesson would you like to choose?', {
        chat_id: userID,
        message_id: messageID,
        ...inlineKeyboard
    })
}

const lessonChoice = async (msg, bot, dbLessons) => {
    const userID = msg.message.chat.id
    const messageID = msg.message.message_id
    const messageData = msg.data
    let lessonText;
    // Grammar_JLPT_5_Level_23_Lesson_45
    const messageDataArr = messageData.split('_');
    let collectionName = messageDataArr[0]
    const JLPTAttributeValue = parseInt(messageDataArr[2]);
    const levelAttributeValue = parseInt(messageDataArr[4])
    const lessonAttributeValue = parseInt(messageDataArr[6])

    const lesson = await dbLessons.getLesson(collectionName, JLPTAttributeValue, levelAttributeValue, lessonAttributeValue)
    switch (collectionName) {
        case collectionNames.grammar:
            lessonText = await lessonFormatted.Grammar(lesson, lessonAttrs.info, lessonAttrs.Grammar.meanings,
                lessonAttrs.Grammar.usage, lessonAttrs.Grammar.examples)
            break
        case collectionNames.basics:
            break
        case collectionNames.vocabulary:
            lessonText = await lessonFormatted.Vocabulary(lesson, lessonAttrs.info,
                lessonAttrs.Vocabulary.words,
                lessonAttrs.Vocabulary.readings, lessonAttrs.Vocabulary.meanings,
                lessonAttrs.Vocabulary.examples)
            break
        case collectionNames.kanji:
            // This will be reduced to putting lessonAttrs.Grammar
             lessonText = await lessonFormatted.Kanji(lesson, lessonAttrs.info, lessonAttrs.JLPT,
                 lessonAttrs.Kanji.kanji, lessonAttrs.Kanji.reading, lessonAttrs.Kanji.meaning,
                 lessonAttrs.Kanji.how_to_write, lessonAttrs.Kanji.origin_text,lessonAttrs.Kanji.origin_image,
                 lessonAttrs.Kanji.development_image,lessonAttrs.Kanji.vocabulary, lessonAttrs.Kanji.examples )
    }
    if (!lessonText){
        lessonText = "The lesson is currently unavailable!"
    }
    await bot.editMessageText(lessonText, {
        chat_id: userID,
        message_id: messageID,
        disable_web_page_preview: false,
        parse_mode: 'Markdown'
    })

}
export {lessonJLPT, lessonLevel, lessonNumber, lessonChoice};