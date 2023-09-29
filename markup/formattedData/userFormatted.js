async function formatUserInfo(userInfo){
    const boldInfo = `*User Information*`
    const normalInfo = `
Name: ${userInfo.first_name}\n
`
    const boldSettings = `*Settings*`
    const normalSettings = `
Hiragana Practise Count: ${userInfo["settings"]["Hiragana_practise_count"]}
Katakana Practise Count: ${userInfo["settings"]["Katakana_practise_count"]}
`
    return boldInfo + normalInfo + boldSettings + normalSettings;
}

export default formatUserInfo