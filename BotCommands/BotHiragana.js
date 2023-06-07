import fs from "fs";
import bot from "./BotMain.js";
import TelegramBot from "node-telegram-bot-api";
import {botToken} from "../config/config.js";

bot.on('message', async (msg) => {
    const chatId = msg.chat.id
    const message = msg.text
    const pathFile = `./images/hiragana/letters/${message}.png`;

    fs.access(pathFile, fs.F_OK, (accessError) => {
        if (accessError) {
            console.log(accessError)
            bot.sendMessage(chatId, "Photo can't be uploaded!");
        } else {
            fs.readFile(pathFile, (readError, imageBuffer) => {
                if (readError) {
                    bot.sendMessage(chatId, "Failed to read the image file!");
                } else {
                    bot.sendPhoto(chatId, imageBuffer, {caption: "Here is the photo!"})
                        .then(() => {
                            console.log("Photo sent successfully!");
                        })
                        .catch((sendError) => {
                            console.error("Failed to send photo:", sendError);
                        });
                }
            });
        }
    });
});
export default bot;