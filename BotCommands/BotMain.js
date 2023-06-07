import TelegramBot from "node-telegram-bot-api";
import fs from "fs";
import {botToken, dbConnectionString} from "../config/config.js";
import DBJapaneseAlphabet from "../DBContext/DBJapaneseAlphabet.js";
import DBMain from "../DBContext/DBMain.js";

const bot = new TelegramBot(botToken, {polling: true});
const dbInstance = new DBMain(dbConnectionString)

bot.onText(/\/hiragana/, async (msg) => {
    try {
        let correctGuesses = 0;
        await dbInstance.openConnection();
        const array_letters = await DBJapaneseAlphabet.retrieveRandomCharacters(dbInstance.client, 5, "Hiragana");
        for (const info of array_letters) {
            await bot.sendMessage(msg.chat.id, "English representative of this character: " + info["character"]);

            const responseMsg = await new Promise((resolve) => {
                bot.onText(/.*/, (response) => {
                    if (response.chat.id === msg.chat.id) {
                        resolve(response);
                    }
                });
            });

            if (responseMsg.text === info["english"]) {
                await bot.sendMessage(msg.chat.id, "Correct!");
                correctGuesses++;
            } else {
                await bot.sendMessage(msg.chat.id, "Incorrect!");
            }

            console.log("User responded!", msg.chat.id);
            console.log("User responded with:", responseMsg.text);
            console.log("Correct answer", info["english"] )
        }

        await bot.sendMessage(msg.chat.id, "Test over! You got " + correctGuesses + " correct answer(s).");
        console.log("User: " + msg.chat.id, "Test over! You got " + correctGuesses + " correct answer(s).")
    } catch (err) {
        console.log("Error:", err);
    } finally {
        await dbInstance.closeConnection();
    }
});


export default bot;