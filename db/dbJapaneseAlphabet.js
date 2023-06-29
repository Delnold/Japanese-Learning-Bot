class DBJapaneseAlphabet {
    constructor(JapaneseAlphabetDB) {
        this.db = JapaneseAlphabetDB
    }

    async retrieveRandomCharacters(count, collectionName) {
        try {
            const collection = await this.db.collection(collectionName);
            return await collection.aggregate([{$sample: {size: count}}]).toArray();
        } catch (error) {
            console.error(`Error retrieving random ${collectionName} characters:`, error);
        }
    }

    async retrieveInfoCharacters(arrayLetters, collectionName) {
        try {
            const collection = await this.db.collection(collectionName);
            return await collection.find({character: {$in: arrayLetters}}).toArray()

        } catch (error) {
            console.error(`Error retrieving info of ${collectionName} characters:`, error);
        }
    }
}

export default DBJapaneseAlphabet;
