import TelegramBot from "node-telegram-bot-api";
import fs from "fs";
import {botToken, dbConnectionString} from "../config/config.js";
import DBJapaneseAlphabet from "../DBContext/DBJapaneseAlphabet.js";
import DBMain from "../DBContext/DBMain.js";

const bot = new TelegramBot(botToken, {polling: true});
const dbInstance = new DBMain(dbConnectionString)

bot.onText(/\/hiragana/, async (msg) => {
  try {
    await dbInstance.openConnection();
    const array_letters = await DBJapaneseAlphabet.retrieveRandomCharacters(dbInstance.client,5, "Hiragana");
    for (const info of array_letters) {
      await bot.sendMessage(msg.chat.id, JSON.stringify(info));
      await new Promise((resolve) => {
        bot.onText(/.*/, (responseMsg) => {
          if (responseMsg.chat.id === msg.chat.id) {
            resolve(responseMsg.text);
          }
        });
      });
      console.log("User responded!", msg.chat.id);
    }
  } catch (err) {
    console.log("Error:", err);
  } finally {
    await dbInstance.closeConnection();
  }
});

export default bot;