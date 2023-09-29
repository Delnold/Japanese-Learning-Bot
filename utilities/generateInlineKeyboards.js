import {backMenu} from "../markup/commandsNaming/commandsNaming.js";

function generateInlineKeyboardLetter(inlineKeyboard, name) {
    const modifiedInlineKeyboard = JSON.parse(JSON.stringify(inlineKeyboard));

    modifiedInlineKeyboard.reply_markup.inline_keyboard.forEach((row) => {
        row.forEach((button) => {
            const {text, callback_data} = button;
            if (text !== backMenu && !callback_data.startsWith(`${name}_Count_`)) {
                button.callback_data = `${name}_Count_${callback_data}`;
            }
        });
    });

    return modifiedInlineKeyboard;
}

async function generateInlineKeyboard(arrayForInlineKeyboard) {
    const inlineMarkUp = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: []
        },
        resize_keyboard: true,
        one_time_keyboard: true,
        is_persistent: true,
    };
    arrayForInlineKeyboard.forEach(attribute => {
        inlineMarkUp.reply_markup.inline_keyboard.push([{
            text: attribute["text"],
            callback_data: attribute["callback_data"]
        }])
    })
    return inlineMarkUp

}

async function generateInlineKeyboardLetterQuiz(testArrayOfOptions, optionsArrayCount, collectionPrac, userTestActivityID) {
    const inlineMarkUp = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: []
        },
        resize_keyboard: false,
        one_time_keyboard: true,
        is_persistent: true,
    };
    const arrayOfChoice = testArrayOfOptions[optionsArrayCount]
    const rows = Math.ceil(arrayOfChoice.length / 2);

    for (let i = 0; i < rows; i++) {
        const buttonsRow = [];
        for (let j = 0; j < 2; j++) {
            const index = i * 2 + j;
            if (index < arrayOfChoice.length) {
                const attribute = arrayOfChoice[index];
                buttonsRow.push({
                    text: attribute,
                    callback_data: collectionPrac + "_" + userTestActivityID + "_" + attribute
                });
            }
        }
        inlineMarkUp.reply_markup.inline_keyboard.push(buttonsRow);
    }

    return inlineMarkUp;
}


export {generateInlineKeyboard, generateInlineKeyboardLetter, generateInlineKeyboardLetterQuiz};
