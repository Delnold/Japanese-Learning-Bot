const randomCharacters = async (msg, bot, dbJapaneseAlphabet, collectionName, count = 5) => {
    try {
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
            if (responseMsg.text.includes("/")){
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
export default randomCharacters;