import {backMenu} from "../commandsNaming/commandsNaming.js";
import {practiseNaming} from "../commandsNaming/practiseNaming.js";

const selectKeyboardTraining = {
    parse_mode: 'Markdown',
    reply_markup: {
         keyboard: [[practiseNaming.katahira.katakana.name, practiseNaming.katahira.hiragana.name], [backMenu]],
            resize_keyboard: true,
            one_time_keyboard: true,
            is_persistent: true
    },
    resize_keyboard: true,
    one_time_keyboard: true,
    is_persistent: true,
};

export default selectKeyboardTraining