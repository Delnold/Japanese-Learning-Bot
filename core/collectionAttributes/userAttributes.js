import generateUsersAttributes from "../../utilities/generateUsersAttributes.js";

const userAttributesJSON = {
    "settings.Hiragana_practise_count": 5,
    "settings.Hiragana_practise_time": 5,
    "settings.Katakana_practise_count": 5,
    "settings.Katakana_practise_time": 5,
}

async function updateUsersWithAttributes(db, collectionUsers, userAttributes) {
    try {
        await db.collection(collectionUsers).updateMany({}, userAttributes);
    } catch (error) {
        throw error;
    }
}
const settingsAttributeName = "settings"

const userAttributes = generateUsersAttributes(userAttributesJSON)
;

export  {settingsAttributeName, userAttributes, updateUsersWithAttributes}