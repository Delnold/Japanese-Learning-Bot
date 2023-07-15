async function formatKanjiInfo(kanjiData) {
    const boldText = `*Kanji Information*\n`;
    const normalText = `
Character: ${kanjiData.character}
Strokes: ${kanjiData.strokes}
Grade: ${kanjiData.grade}
Frequency: ${kanjiData.freq}
JLPT (Old): N${kanjiData.jlpt_old}
JLPT (New): N${kanjiData.jlpt_new}
Meanings: ${kanjiData.meanings.join(', ')}
Readings (On): ${kanjiData.readings_on.join(', ')}
Readings (Kun): ${kanjiData.readings_kun.join(', ')}
WK Level: ${kanjiData.wk_level}
WK Meanings: ${kanjiData.wk_meanings.join(', ')}
WK Readings (On): ${kanjiData.wk_readings_on.join(', ')}
WK Readings (Kun): ${kanjiData.wk_readings_kun.join(', ')}
WK Radicals: ${kanjiData.wk_radicals.join(', ')}
`;
    return boldText + normalText;
}

export default formatKanjiInfo;