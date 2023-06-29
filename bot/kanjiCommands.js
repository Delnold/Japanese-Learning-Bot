const kanjiInfo = async (msg, match, bot, dbJapaneseAlphabet, collectionKanjiName) => {
    try {
        const arrayElements = [...new Set(match[1].split(''))];
        const array_letters = await dbJapaneseAlphabet.retrieveInfoCharacters(arrayElements, collectionKanjiName);
        for (const info of array_letters) {
            await bot.sendMessage(msg.chat.id, [info["jlpt_new"], info["readings_on"]].toString());
        }
    } catch (err) {
        console.log("Error:", err);
    }
};

export default kanjiInfo;