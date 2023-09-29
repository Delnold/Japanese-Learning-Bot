import {menuNaming} from "../commandsNaming/menuNaming.js";

const selectKeyboardStart = {
    parse_mode: 'Markdown',
    reply_markup: {
        keyboard: [[menuNaming.lessonsMenu.name, menuNaming.practisingMenu.name],
            [menuNaming.toolsMenu.name, menuNaming.profileMenu.name]],
            resize_keyboard: true,
            one_time_keyboard: true,
            is_persistent: true
    },
    resize_keyboard: true,
    one_time_keyboard: true,
    is_persistent: true,
};

export default selectKeyboardStart;