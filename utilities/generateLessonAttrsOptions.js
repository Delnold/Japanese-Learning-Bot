


async function JLPTAttributes(collectionName, JLPTAttributeName, JLPTAttributes) {
    const arrayOfAttributes = []
    JLPTAttributes.forEach(value => {
        arrayOfAttributes.push({
            "text": JLPTAttributeName + " " + value,
            "callback_data": collectionName + "_" + JLPTAttributeName + "_" + value
        })
    })
    return arrayOfAttributes
}

async function levelsAttributes(collectionName, JLPTAttributeName, JLPTAttributeValue, levelAttributeName, attributes) {
    const arrayOfAttributes = []
    attributes.forEach(value => {
        arrayOfAttributes.push({
            "text": levelAttributeName + " " + value,
            "callback_data": collectionName + "_" + JLPTAttributeName + "_" + JLPTAttributeValue + "_" + levelAttributeName + "_" + value
        })
    })
    return arrayOfAttributes


}

async function lessonsAttributes(collectionName, JLPTAttributeName, JLPTAttributeValue, levelAttributeName, levelAttributeValue, lessonAttributeName, infoAttributeName, attributes){
    const arrayOfAttributes = []
    attributes[lessonAttributeName].forEach((value, index) => {
        const lessonInfo = attributes[infoAttributeName][index]
        arrayOfAttributes.push({
            "text": `${lessonInfo}`,
            "callback_data": collectionName + "_" + JLPTAttributeName + "_" + JLPTAttributeValue
                + "_" + levelAttributeName + "_" + levelAttributeValue + "_" + lessonAttributeName
                + "_" + `${value}`
        })
    })
    return arrayOfAttributes
}

export {JLPTAttributes, levelsAttributes, lessonsAttributes}