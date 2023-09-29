const menuNaming = {
    practisingMenu: {
        name: '実践 Practising',
        get RegEx() {
            return new RegExp(this.name)
        }
    },
    toolsMenu: {
        name: '用具 Tools',
        get RegEx() {
            return new RegExp(this.name)
        }
    },
    profileMenu: {

        name: 'プロフィール Profile',
        get RegEx() {
            return new RegExp(this.name)
        }
    },
    lessonsMenu: {
        name: 'レッスン Lessons',
        get RegEx() {
            return new RegExp(this.name)
        }
    },
}

export {menuNaming};