async function formatLessonGrammar(japaneseData, meaningAttributeName, usageAttributeName, exampleAttributeName) {
    console.log(japaneseData);
    const infoText = `*${japaneseData["info"]}*\n\n`;
    let contentText = ''
    const usages = japaneseData[usageAttributeName];
    const meanings = japaneseData[meaningAttributeName];
    const examples = japaneseData[exampleAttributeName];

    for (let i = 0; i < Math.max(usages.length, meanings.length, examples.length); i++) {
        const usage = "*Usage:*" + '\n' + usages[i].join("\n") || '';
        const meaning = "*Meanings:*" + '\n' + meanings[i].join("\n") || '';
        const example = "*Examples:*" + '\n' + examples[i].join("\n") || '';
        contentText +=  usage + '\n\n' + meaning + '\n\n' + example + '\n\n'
    }

    return infoText + contentText
}


export default formatLessonGrammar;
