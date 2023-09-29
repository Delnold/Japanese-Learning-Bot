import {collectionNames} from "../../core/config.js";
import lessonAttrs from "../../core/collectionAttributes/lessonAttributes.js";

const lessonsNaming = {
    lessonType:
        {
            grammar: "文法 Grammar",
            vocabulary: "語彙 Vocabulary",
            kanji: "漢字 Kanji",
            basics: "基礎 Basics",
        },
    lessonRegEx: {
        get lessonTypeRegEx() {
            return new RegExp(lessonsNaming.lessonType.grammar + "|"
                + lessonsNaming.lessonType.vocabulary + "|"
                + lessonsNaming.lessonType.kanji + "|"
                + lessonsNaming.lessonType.basics)
        },
        get lessonMatchJLPTRegEx() {
            return new RegExp(
                `^(${collectionNames.grammar}|${collectionNames.basics}|${collectionNames.vocabulary}|${collectionNames.kanji})_${lessonAttrs.JLPT}_[1-5]\\b`)
        },
        get lessonMatchLevelRegEx() {
            return new RegExp(
                `^(${collectionNames.grammar}|${collectionNames.basics}|${collectionNames.vocabulary}|${collectionNames.kanji})_${lessonAttrs.JLPT}_[1-5]_${lessonAttrs.level}_\\d+\\b`
            )
        },
        get lessonMatchNumberRegEx() {
            return new RegExp(`^(${collectionNames.grammar}|${collectionNames.basics}|${collectionNames.vocabulary}|${collectionNames.kanji})_${lessonAttrs.JLPT}_[1-5]_${lessonAttrs.level}_\\d+_${lessonAttrs.lesson}_\\d+\\b`)
        }
    }


}

export {lessonsNaming}