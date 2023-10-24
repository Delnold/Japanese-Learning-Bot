import {toolsNaming} from "../../markup/commandsNaming/toolsNaming.js";
import {filePaths} from "../../core/filePaths.js";
import path from "path";
import openPhotoAsync from "../../utilities/fileCommands.js";
import formatKanjiInfo from "../../markup/formattedData/kanjiFormatted.js";

const mnemonicCharts = async (msg, bot) => {
    try {
        let pathChart;
        switch (msg.text) {
            case toolsNaming.katahira.hiraganaMnemonicChart.name:
                pathChart = filePaths.mnemonicChartsHiraganaPathFolder
                break
            case toolsNaming.katahira.katakanaMnemonicChart.name:
                pathChart = filePaths.mnemonicChartsKatakanaPathFolder
                break

        }
        const fileName = path.basename(pathChart)
        const chartPhoto = await openPhotoAsync(pathChart)
        await bot.sendDocument(msg.chat.id, chartPhoto, {caption: "Chart is here!"}, {
            filename: fileName,
            contentType: 'image/png'
        })
    } catch (err) {
        console.log("Error:", err);
    }
}

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
        const kanjiPhoto = await openPhotoAsync(`${filePaths.kanjiPathFolder}${kanjiName}.png`)
        const kanjiFormatted = await formatKanjiInfo(kanjiResult)
        await bot.sendPhoto(userID, kanjiPhoto, {caption: kanjiFormatted, parse_mode: 'Markdown'})
    } catch (err) {
        console.log("Error:", err);
    }
};

export {mnemonicCharts, kanjiInfo}