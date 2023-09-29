const toolsNaming = {
    kanjiInfo: {
      name: '漢字 Kanji Info',
      get RegEx(){
          return new RegExp(this.name)
      }
    },
    katahira: {
        katakanaMnemonicChart: {
            name: 'カタカナ Mnemonic Chart',
        },
        hiraganaMnemonicChart: {
            name: 'ひらがな Mnemonic Chart'
        },
        get RegEx(){
            return new RegExp(this.katakanaMnemonicChart.name + "|" + this.hiraganaMnemonicChart.name)
        }
    }
}

export {toolsNaming}
