import {hiraganaMnemonicChart, kanjiInfo, katakanaMnemonicChart} from "../commandsNaming/toolsNaming.js";
import {backMenu} from "../commandsNaming/commandsNaming.js";

const selectKeyboardTools = {
    parse_mode: 'Markdown',
    reply_markup: {
        keyboard: [[kanjiInfo],[hiraganaMnemonicChart,katakanaMnemonicChart],[backMenu]],
            resize_keyboard: true,
            one_time_keyboard: true,
            is_persistent: true
    },
    resize_keyboard: true,
    one_time_keyboard: true,
    is_persistent: true,
};

export default selectKeyboardTools;