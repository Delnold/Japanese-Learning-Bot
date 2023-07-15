import {backMenu} from "../commandsNaming/commandsNaming.js";
import {hiraganaPrac, katakanaPrac} from "../commandsNaming/practisingNaming.js";

const selectKeyboardTraining = {
    parse_mode: 'Markdown',
    reply_markup: {
         keyboard: [[katakanaPrac, hiraganaPrac], [backMenu]],
            resize_keyboard: true,
            one_time_keyboard: true,
            is_persistent: true
    },
    resize_keyboard: true,
    one_time_keyboard: true,
    is_persistent: true,
};

export default selectKeyboardTraining