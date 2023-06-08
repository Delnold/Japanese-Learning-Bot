import fs from "fs";

const random_characters = async (msg, bot, dbInstance, DBJapaneseAlphabet, collectionName, count = 5) => {
    try {
        let correctGuesses = 0;
        await dbInstance.openConnection();
        const clientDB = dbInstance.client
        const array_letters = await DBJapaneseAlphabet.retrieveRandomCharacters(clientDB, count, collectionName);
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
            console.log("Correct answer", info["english"])
        }

        await bot.sendMessage(msg.chat.id, "Test over! You got " + correctGuesses + " correct answer(s).");
        console.log("User: " + msg.chat.id, "Test over! You got " + correctGuesses + " correct answer(s).")
    } catch (err) {
        console.log("Error:", err);
    } finally {
        await dbInstance.closeConnection();
    }
};

// bot.on('message', async (msg) => {
//     const chatId = msg.chat.id
//     const message = msg.text
//     const pathFile = `./images/hiragana/letters/${message}.png`;
//
//     fs.access(pathFile, fs.F_OK, (accessError) => {
//         if (accessError) {
//             console.log(accessError)
//             bot.sendMessage(chatId, "Photo can't be uploaded!");
//         } else {
//             fs.readFile(pathFile, (readError, imageBuffer) => {
//                 if (readError) {
//                     bot.sendMessage(chatId, "Failed to read the image file!");
//                 } else {
//                     bot.sendPhoto(chatId, imageBuffer, {caption: "Here is the photo!"})
//                         .then(() => {
//                             console.log("Photo sent successfully!");
//                         })
//                         .catch((sendError) => {
//                             console.error("Failed to send photo:", sendError);
//                         });
//                 }
//             });
//         }
//     });
// });
export default random_characters;