import {backMenu} from "../commandsNaming/commandsNaming.js";
import {hiraganaSettingsCount, katakanaSettingsCount, settingsProfile} from "../commandsNaming/profileNaming.js";
import generateInlineKeyboardLetter from "../../utilities/generateInlineKeyboards.js";
import {collectionHiraganaName, collectionKatakanaName} from "../../core/config.js";
const inlineKeyboardProfile = {
    parse_mode: 'Markdown',
    reply_markup: {
        inline_keyboard: [
            [
                {text: settingsProfile, callback_data: settingsProfile},
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
                {text: hiraganaSettingsCount, callback_data: hiraganaSettingsCount},
                {text: katakanaSettingsCount, callback_data: katakanaSettingsCount}
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

const inlineKeyboardKatakanaCount = generateInlineKeyboardLetter(inlineKeyboardCount, collectionKatakanaName)
const inlineKeyboardHiraganaCount = generateInlineKeyboardLetter(inlineKeyboardCount, collectionHiraganaName)


export {inlineKeyboardProfile, inlineKeyboardSettings,
    inlineKeyboardKatakanaCount, inlineKeyboardHiraganaCount};