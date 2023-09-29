import {lessonsNaming} from "../commandsNaming/lessonsNaming.js";
import {backMenu} from "../commandsNaming/commandsNaming.js";

const selectKeyboardLessons = {
    parse_mode: 'Markdown',
    reply_markup: {
        keyboard: [[lessonsNaming.lessonType.grammar, lessonsNaming.lessonType.vocabulary],
            [lessonsNaming.lessonType.kanji,lessonsNaming.lessonType.basics],[backMenu]],
            resize_keyboard: true,
            one_time_keyboard: true,
            is_persistent: true
    },
    resize_keyboard: true,
    one_time_keyboard: true,
    is_persistent: true,
};

export default selectKeyboardLessons;