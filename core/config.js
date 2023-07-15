import 'dotenv/config';

const clusterConnectionString = process.env.CONNECTION_STRING_MONGODB
const botToken = process.env.TELEGRAM_BOT_TOKEN

const dbJapaneseAlphabet = "Japanese_Alphabet";
const dbUsers = "Users"

const collectionTelegramName = "Telegram"
const collectionHiraganaName = "Hiragana";
const collectionKatakanaName = "Katakana";
const collectionKanjiName = "Kanji";

const userAttributes =
    [{
        $set: {
            'settings.Hiragana_practise_count': {$cond: [{$not: ['$settings.Hiragana_practise_count']}, 5, '$settings.Hiragana_practise_count']},
            'settings.Hiragana_practise_time':  {$cond: [{$not: ['$settings.Hiragana_practise_time']}, 5, '$settings.Hiragana_practise_time']},
            'settings.Katakana_practise_count': {$cond: [{$not: ['$settings.Katakana_practise_count']}, 5, '$settings.Katakana_practise_count']},
            'settings.Katakana_practise_time':  {$cond: [{$not: ['$settings.Katakana_practise_time']}, 5, '$settings.Katakana_practise_time']}
        }
    }]
;

export {
    clusterConnectionString, botToken,
    dbJapaneseAlphabet, dbUsers, collectionTelegramName,
    collectionHiraganaName, collectionKatakanaName,
    collectionKanjiName, userAttributes
}