import { MongoClient } from "mongodb";
import { clusterConnectionString, dbJapaneseAlphabet, dbUsers} from "./config.js";

let dbJpAlphabet;
let dbUS;

async function connectToDatabase(dbName) {
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

dbJpAlphabet = await connectToDatabase(dbJapaneseAlphabet);
dbUS = await connectToDatabase(dbUsers);

export {dbJpAlphabet, dbUS}
