const practiseNaming = {
    katahira: {
        katakana: {
            name: 'カタカナ　Katakana',
            get RegEx() {
                return new RegExp(`^${this.name}_(\\w{24})_(\\w{1,3})`)
            }
        },
        hiragana: {
            name: 'ひらがな　Hiragana',
            get RegEx() {
                return new RegExp(`^${this.name}_(\\w{24})_(\\w{1,3})`)
            }
        },
        get RegExPrac() {
            return new RegExp(`^${this.katakana.name}|^${this.hiragana.name}`)
        },
        get RegExQuiz() {
            return new RegExp(`^${this.hiragana.RegEx.source}|^${this.katakana.RegEx.source}`)
        },
    }

}


export {practiseNaming}