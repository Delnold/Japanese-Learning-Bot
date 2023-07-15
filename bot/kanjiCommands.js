import formatKanjiInfo from "../markup/formattedData/kanjiFormatted.js"
import openPhotoAsync from "../utilities/fileCommands.js";
import {kanjiPathFolder} from "../core/filePaths.js";

const kanjiInfo = async (msg, bot, dbJapaneseAlphabet, collectionKanjiName) => {
    try {
        const userID = msg.chat.id
        await bot.sendMessage(userID, "Please provide me with a Kanji character you would like to get information about");
        const kanjiAbout = await new Promise((resolve) => {
            bot.onText(/.*/, (response) => {
                if (response.chat.id === userID) {
                    resolve(response.text);
                }
            });
        });
        const kanjiResult = await dbJapaneseAlphabet.retrieveInfoCharacter(kanjiAbout, collectionKanjiName);
        const kanjiName = kanjiResult.character
        const kanjiPhoto = await openPhotoAsync(kanjiPathFolder + kanjiName + ".png")
        const kanjiFormatted = await formatKanjiInfo(kanjiResult)
        await bot.sendPhoto(userID, kanjiPhoto, {caption: kanjiFormatted, parse_mode: 'Markdown'})
    } catch (err) {
        console.log("Error:", err);
    }
};

export default kanjiInfo;