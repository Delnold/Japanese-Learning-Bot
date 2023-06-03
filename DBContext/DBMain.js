import {MongoClient} from "mongodb";

class DBMain {
    constructor(connectionUri) {
        this.client = new MongoClient(connectionUri, {useUnifiedTopology: true, useNewUrlParser: true});
    }

    async openConnection() {
        try {
            await this.client.connect(); // Connect to the MongoDB server
            console.log('Connected to MongoDB server');
        } catch (err) {
            console.error('Error connecting to MongoDB:', err);
            throw err;
        }
    }

    async closeConnection() {
        try {
            await this.client.close(); // Close the MongoDB connection
            console.log('Disconnected from MongoDB server');
        } catch (err) {
            console.error('Error closing MongoDB connection:', err);
            throw err;
        }
    }
}

export default DBMain;
