const generateUsersAttributes = function (attributes) {
    let finalAttributes = [{$set: {}}];

    for (const attr in attributes) {
        finalAttributes[0]["$set"][attr] = {
            $ifNull: [`$${attr}`, attributes[attr]]
        };
    }

    return finalAttributes;
}
export default generateUsersAttributes;
