class DBUsers {
    constructor(usersDB, userAttributes = {}) {
        this.db = usersDB
        this.userAttributes = userAttributes
    }

    async addUser(userInfo, collectionNameUsers) {
        try {
            const collection = await this.db.collection(collectionNameUsers);
            const userID = userInfo.id
            if (await this.getUser(userID, collectionNameUsers) == null) {
                await collection.insertOne(userInfo)
                await collection.updateOne({id: userID}, this.userAttributes, {upsert: true})
            }
            console.log("User already exist!")
        } catch
            (error) {
            console.error(`Error adding user!`);
        }
    }

    async getUser(userID, collectionNameUsers) {
        try {
            const collection = await this.db.collection(collectionNameUsers);
            const user = await collection.findOne({id: userID})
            if (user) {
                return user
            }
            return null
        } catch
            (error) {
            console.error(`Error getting user!`, error);
        }
    }

    async setLetterPractiseCount(userID, collectionNameUsers, collectionNameLetter, count) {
        try {
            const user = await this.getUser(userID, collectionNameUsers)
            if (user != null) {
                const collection = await this.db.collection(collectionNameUsers);
                const practiseCount = "settings." + collectionNameLetter + "_practise" + "_count"
                const letterPractiseCount = {
                    $set: {
                        [`${practiseCount}`]: count
                    }
                }
                return await collection.updateOne(user, letterPractiseCount)
            }
        } catch
            (error) {
            console.error(`Error setting practise count!`);
        }
    }
}

export default DBUsers