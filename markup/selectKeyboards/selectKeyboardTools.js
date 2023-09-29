import {toolsNaming} from "../commandsNaming/toolsNaming.js";
import {backMenu} from "../commandsNaming/commandsNaming.js";

const selectKeyboardTools = {
    parse_mode: 'Markdown',
    reply_markup: {
        keyboard: [[toolsNaming.kanjiInfo.name],[toolsNaming.katahira.hiraganaMnemonicChart.name,
            toolsNaming.katahira.katakanaMnemonicChart.name],[backMenu]],
            resize_keyboard: true,
            one_time_keyboard: true,
            is_persistent: true
    },
    resize_keyboard: true,
    one_time_keyboard: true,
    is_persistent: true,
};

export default selectKeyboardTools;