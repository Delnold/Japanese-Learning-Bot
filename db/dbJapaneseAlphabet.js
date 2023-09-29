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

    async retrieveInfoCharacter(kanjiAbout, collectionName) {
        try {
            const collection = await this.db.collection(collectionName);
            return await collection.findOne({character: kanjiAbout})

        } catch (error) {
            console.error(`Error retrieving info of ${collectionName} characters:`, error);
        }
    }
}

export default DBJapaneseAlphabet;
