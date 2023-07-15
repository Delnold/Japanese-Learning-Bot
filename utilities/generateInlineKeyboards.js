import {backMenu} from "../markup/commandsNaming/commandsNaming.js";

function generateInlineKeyboardLetter(inlineKeyboard, name) {
    const modifiedInlineKeyboard = JSON.parse(JSON.stringify(inlineKeyboard));

    modifiedInlineKeyboard.reply_markup.inline_keyboard.forEach((row) => {
        row.forEach((button) => {
            const { text, callback_data } = button;
            if (text !== backMenu && !callback_data.startsWith(`${name}_Count_`)) {
                button.callback_data = `${name}_Count_${callback_data}`;
            }
        });
    });

    return modifiedInlineKeyboard;
}

export default generateInlineKeyboardLetter;
