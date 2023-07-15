import { katakanaMnemonicChart, hiraganaMnemonicChart} from "../markup/commandsNaming/toolsNaming.js"
import {collectionHiraganaName, collectionKatakanaName} from "../core/config.js";
import {hiraganaPrac, katakanaPrac} from "../markup/commandsNaming/practisingNaming.js"
import {
    mnemonicChartsHiraganaPathFolder,
    mnemonicChartsKatakanaPathFolder
} from "../core/filePaths.js";
import openPhotoAsync from "../utilities/fileCommands.js";
import path from "path";

const randomCharacters = async (msg, bot, dbJapaneseAlphabet, count = 5) => {
    try {
        let collectionName;
        switch (msg.text) {
            case hiraganaPrac:
                collectionName = collectionHiraganaName
                break
            case katakanaPrac:
                collectionName = collectionKatakanaName

        }
        let correctGuesses = 0;
        const arrayLetters = await dbJapaneseAlphabet.retrieveRandomCharacters(count, collectionName);
        for (const info of arrayLetters) {
            await bot.sendMessage(msg.chat.id, "English representative of this character: " + info["character"]);

            const responseMsg = await new Promise((resolve) => {
                bot.onText(/.*/, (response) => {
                    if (response.chat.id === msg.chat.id) {
                        resolve(response);
                    }
                });
            });
            if (responseMsg.text.includes("/")) {
                return
            }
            if (responseMsg.text.toLowerCase() === info["english"]) {
                await bot.sendMessage(msg.chat.id, "Correct!");
                correctGuesses++;
            } else {
                await bot.sendMessage(msg.chat.id, `Incorrect! Correct answer: ${info["english"]}`);
            }

            console.log("User responded!", msg.chat.id);
            console.log("User responded with:", responseMsg.text);
            console.log("Correct answer", info["english"])
        }

        await bot.sendMessage(msg.chat.id, "Test over! You got " + correctGuesses + " correct answer(s).");
        console.log("User: " + msg.chat.id, "Test over! You got " + correctGuesses + " correct answer(s).")
    } catch (err) {
        console.log("Error:", err);
    }
};
const mnemonicCharts = async (msg, bot) => {
    try {
        let pathChart;
        console.log(msg.text)
        switch (msg.text) {
            case hiraganaMnemonicChart:
                pathChart = mnemonicChartsHiraganaPathFolder
                break
            case katakanaMnemonicChart:
                pathChart = mnemonicChartsKatakanaPathFolder
                break

        }
        const fileName = path.basename(pathChart)
        const chartPhoto = await openPhotoAsync(pathChart)
        await bot.sendDocument(msg.chat.id, chartPhoto, {caption: "Chart is here!"},{filename: fileName, contentType: 'image/png'} )
    }catch (err) {
        console.log("Error:", err);
    }
}

export {randomCharacters, mnemonicCharts};