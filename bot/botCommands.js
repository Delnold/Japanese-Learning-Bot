import bot from "./bot.js";

const startCommand = async (msg, bot) => {
    await bot.sendMessage(msg.chat.id, "Welcome to this bot dear user!!", {
        'reply_markup': {
            'keyboard': [['lessons', 'training'], ['tools', 'profile']],
            resize_keyboard: true,
            one_time_keyboard: true,
        }
    });
}
const traningCommand = async (msg, bot) => {
    await bot.sendMessage(msg.chat.id, "Choose your training session!", {
        'reply_markup': {
            'keyboard': [['katakana', 'hiragana'], ['kanji', 'back']],
            resize_keyboard: true,
            one_time_keyboard: true,
        }
    });
}
const backCommand = async (msg, bot) => {
    startCommand(msg, bot)
}

export {startCommand, traningCommand, backCommand}