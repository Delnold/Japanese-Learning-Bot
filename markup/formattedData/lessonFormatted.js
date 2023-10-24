const lessonFormatted = {
    Grammar: async function (japaneseData, infoAttributeName, meaningAttributeName,
                             usageAttributeName, exampleAttributeName) {
        const infoText = `*${japaneseData[infoAttributeName]}*\n\n`;
        let contentText = ''
        const usages = japaneseData[usageAttributeName];
        const meanings = japaneseData[meaningAttributeName];
        const examples = japaneseData[exampleAttributeName];

        for (let i = 0; i < Math.max(usages.length, meanings.length, examples.length); i++) {
            const usage = "*Usage:*" + '\n' + usages[i].join("\n") || '';
            const meaning = "*Meanings:*" + '\n' + meanings[i].join("\n") || '';
            const example = "*Examples:*" + '\n' + examples[i].join("\n") || '';
            contentText += usage + '\n\n' + meaning + '\n\n' + example + '\n\n'
        }

        return infoText + contentText
    },
    Basics: async function () {
        

    },
    Kanji: async function (japaneseData, infoAttributeName, JLPTAttributeName,
                           kanjiAttributeName, readingAttributeName,
                           meaningAttributeName, how_to_writeAttributeName,origin_textAttributeName,
                           origin_imageAttributeName, development_imageAttributeName,
                           vocabularyAttributeName, examplesAttributeName) {
        const infoText = `*${japaneseData["info"]}*\n\n`;
        let contentText = ''
        const kanjis = japaneseData[kanjiAttributeName]
        const readings = japaneseData[readingAttributeName]
        const meanings = japaneseData[meaningAttributeName]
        const words = japaneseData[vocabularyAttributeName]
        const examples = japaneseData[examplesAttributeName]

        if (japaneseData[JLPTAttributeName] === 5){
            contentText += `Reading & Meaning of ${kanjis.join()}\n\n`
            for (let i = 0; i < kanjis.length; i++) {
            contentText += `${i+1}. ${kanjis[i]}  \nKunyomi: ${readings[0][i+1]}  \nOnyomi: ${readings[1][i+1]}  \nMeaning: ${meanings[i]}\n\n`
            }
            contentText += `Words of ${kanjis.join()}\n\n`
            for (let i = 0; i < kanjis.length; i++) {
            contentText += `${i+1}. ${kanjis[i]} \n${words[1][i+1].join("\n")}\n\n`
            }
            if (examples.length !== 0){
                contentText += `Example Sentences of ${kanjis.join()}\n\n`
                contentText += examples[0][0].join("\n")

            }
        }
        else{
            return
        }

        return infoText + contentText
    },
    Vocabulary: async function (japaneseData, infoAttributeName, wordsAttributeName,
                                readingAttributeName, meaningAttributeName, exampleAttributeName) {
        const infoText = `*${japaneseData["info"]}*\n\n`;
        let contentText = ''
        const words = japaneseData[wordsAttributeName];
        const readings = japaneseData[readingAttributeName];
        const meanings = japaneseData[meaningAttributeName];
        const examples = japaneseData[exampleAttributeName]

        for (let i = 0; i < Math.max(readings.length, words.length, meanings.length); i++) {
            contentText += `${i+1}. ${words[i]} (${readings[i]}) - ${meanings[i]}\n\n`
        }
        if (examples.length !== 0) {
            contentText += `Examples: \n${examples.join('\n')}`
        }

        return infoText + contentText
    }
}

export {lessonFormatted};
