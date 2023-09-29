import {MongoClient} from "mongodb";
import {dbNames, collectionNames, config} from "./config.js";
import {userAttributes, updateUsersWithAttributes} from "./collectionAttributes/userAttributes.js";

async function connectToDatabase(dbName, clusterConnectionString) {
    try {
        const client = await MongoClient.connect(clusterConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        return client.db(dbName);
    } catch (error) {
        throw error;
    }
}

let dbConnections = {
    JpAlphabet: await connectToDatabase(dbNames.japaneseAlphabet, config.clusterConnectionString),
    Users: await connectToDatabase(dbNames.users, config.clusterConnectionString),
    Lessons: await connectToDatabase(dbNames.lessons, config.clusterConnectionString),
    Cache: await connectToDatabase(dbNames.cache, config.clusterConnectionString)

}
// Temporary/Dynamic solution instead of migration
await updateUsersWithAttributes(dbConnections.Users, collectionNames.telegram, userAttributes)

export {dbConnections};
