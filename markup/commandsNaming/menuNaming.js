const practisingMenu = '実践 Practising'
const toolsMenu = '用具 Tools'
const profileMenu = 'プロフィール Profile'
const lessonsMenu = 'レッスン Lessons'

const lessonsMenuRegEx = new RegExp(lessonsMenu)
const profileMenuRegEx = new RegExp(profileMenu)
const toolsMenuRegEx = new RegExp(toolsMenu)
const practisingMenuRegEx = new RegExp(practisingMenu)

export {practisingMenuRegEx, toolsMenuRegEx, profileMenuRegEx,
        practisingMenu, toolsMenu, profileMenu, lessonsMenu,
        lessonsMenuRegEx}