const katakanaMnemonicChart = 'カタカナ Mnemonic Chart'
const hiraganaMnemonicChart = 'ひらがな Mnemonic Chart'
const kanjiInfo = '漢字 Kanji Info'

const kanjiInfoRegEx = new RegExp(kanjiInfo)
const katahiraMnemonicChartRegEx = new RegExp(katakanaMnemonicChart + "|" + hiraganaMnemonicChart)

export {katakanaMnemonicChart, kanjiInfoRegEx,
    katahiraMnemonicChartRegEx, hiraganaMnemonicChart,
    kanjiInfo}
