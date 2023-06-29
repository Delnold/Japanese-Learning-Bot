class DBUsers {
    constructor(usersDB) {
        this.db = usersDB
    }

    async addUser(userInfo, collectionName) {
        try {
            const collection = await this.db.collection(collectionName);
            if (await this.checkUser(userInfo, collectionName)){
                await collection.insertOne(userInfo, function (err, res) {
                if (err) throw err;
                console.log("User info inserted!");
                return true
            })
                return "User already exist!"
            }
        } catch
            (error) {
            console.error(`Error adding user!`);
        }
    }
    async checkUser(userInfo, collectionName){
       try {
            const collection = await this.db.collection(collectionName);
            const user = await collection.findOne(userInfo)
            console.log(user)
            if (user){
                return false
            }
            return true
        } catch
            (error) {
            console.error(`Error checking user!`);
        }
    }
}
export default DBUsers