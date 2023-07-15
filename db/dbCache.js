class DBLevelCache {
    constructor(LevelCacheDB) {
        this.db = LevelCacheDB
    }

    async addUserActivity(userID, userCommand) {
        try {
            await new Promise((resolve, reject) => {
                this.db.put(userID, userCommand, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                });
            });
            return true;
        } catch (err) {
            console.log(`Error adding User activity! ${err}`);
            return false;
        }
    }

    async deleteUserActivity(userID) {
        try {
            await new Promise((resolve, reject) => {
                this.db.del(userID, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                });
            });
            return true;
        } catch (err) {
            console.log(`Error deleting User activity! ${err}`);
            return false;
        }
    }

    async checkUserActivity(userID) {
        try {
            await new Promise((resolve, reject) => {
                this.db.get(userID, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                });
            });
            return true;
        } catch (err) {
            return false;
        }
    }


}

export default DBLevelCache;