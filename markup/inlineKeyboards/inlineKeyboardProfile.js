import {backMenu} from "../commandsNaming/commandsNaming.js";
import {profileNaming} from "../commandsNaming/profileNaming.js";
import {generateInlineKeyboardLetter} from "../../utilities/generateInlineKeyboards.js";
import {collectionNames} from "../../core/config.js";
const inlineKeyboardProfile = {
    parse_mode: 'Markdown',
    reply_markup: {
        inline_keyboard: [
            [
                {text: profileNaming.profileSettings.name, callback_data: profileNaming.profileSettings.name},
            ]
        ]
    },
    resize_keyboard: true,
    one_time_keyboard: true,
    is_persistent: true,
};

const inlineKeyboardSettings = {
    parse_mode: 'Markdown',
    reply_markup: {
        inline_keyboard: [
            [
                {text: profileNaming.katahira.hiragana.countLimit, callback_data: profileNaming.katahira.hiragana.countLimit},
                {text: profileNaming.katahira.katakana.countLimit, callback_data: profileNaming.katahira.katakana.countLimit}
            ],
            [
                {text: backMenu, callback_data: backMenu}
            ]
        ]
    },
    resize_keyboard: true,
    one_time_keyboard: true,
    is_persistent: true,
};

const inlineKeyboardCount = {
    parse_mode: 'Markdown',
    reply_markup: {
        inline_keyboard: [
            [
                { text: "5", callback_data: "5" },
                { text: "10", callback_data: "10" },
                { text: "15", callback_data: "15" },
                { text: "20", callback_data: "20" },
                { text: "25", callback_data: "25" },
            ],
            [
                { text: backMenu, callback_data: backMenu }
            ]
        ]
    },
    resize_keyboard: true,
    one_time_keyboard: true,
    is_persistent: true,
};

const inlineKeyboardKatakanaCount = generateInlineKeyboardLetter(inlineKeyboardCount, collectionNames.katakana)
const inlineKeyboardHiraganaCount = generateInlineKeyboardLetter(inlineKeyboardCount, collectionNames.hiragana)


export {inlineKeyboardProfile, inlineKeyboardSettings,
    inlineKeyboardKatakanaCount, inlineKeyboardHiraganaCount};