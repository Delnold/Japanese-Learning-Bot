async function formatUserInfo(userInfo){
    const boldText = `*User Information*\n`
    const normalText = `
Name: ${userInfo.first_name}
    `
    return boldText + normalText;
}

export default formatUserInfo