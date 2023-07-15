import {lessonsMenu, practisingMenu, profileMenu, toolsMenu} from "../commandsNaming/menuNaming.js";

const selectKeyboardStart = {
    parse_mode: 'Markdown',
    reply_markup: {
        keyboard: [[lessonsMenu, practisingMenu], [toolsMenu, profileMenu]],
            resize_keyboard: true,
            one_time_keyboard: true,
            is_persistent: true
    },
    resize_keyboard: true,
    one_time_keyboard: true,
    is_persistent: true,
};

export default selectKeyboardStart;