class DBMongoCache {
    constructor(MongoCacheDB) {
        this.db = MongoCacheDB
    }

    async addUserActivity(activity, collectionName) {
        try {
            const collection = await this.db.collection(collectionName);
            const insertResult = await collection.insertOne(activity);
            return insertResult.insertedId.toString("hex")
        } catch (err) {
            console.log(`Error adding User activity! ${err}`);
            return false;
        }
    }

    async getUserActivity(dataActivity, collectionName) {
        try {
            const collection = await this.db.collection(collectionName);
            ;
            const userActivity = await collection.findOne(dataActivity)
            if (userActivity !== null) {
                return userActivity;
            }
            return null
        } catch (err) {
            return false;
        }
    }


    async deleteUserActivity(dataActivity, collectionName) {
        try {
            const collection = await this.db.collection(collectionName);
            await collection.deleteOne(dataActivity);
            return true;
        } catch (err) {
            console.log(`Error deleting User activity! ${err}`);
            return false;
        }
    }

    async updateUserActivity(filter, dataToUpdate, collectionName) {
        try {
            const collection = await this.db.collection(collectionName);
            const updateResult = await collection.updateOne(filter, dataToUpdate)
            if (updateResult.modifiedCount > 0) {
                return true;
            }
            return false
        } catch (err) {
            console.log(`Error updating User activity! ${err}`);
            return false;
        }
    }

    async checkUserActivity(checkActivity, collectionName) {
        try {
            const collection = await this.db.collection(collectionName);
            if (await collection.findOne(checkActivity) !== null) {
                return true;
            }
            return false
        } catch (err) {
            console.log(`Error checking User activity! ${err}`);
            return false;
        }
    }


}

export default DBMongoCache;