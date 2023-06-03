class DBJapaneseAlphabet {
    constructor() {
        this.dbName = "Japanese_Alphabet";
    }
  async retrieveRandomCharacters(db, count, collectionName) {
    try {
      const db = await db.db(this.dbName)
      const collection = await db.collection(collectionName);
        return await collection.aggregate([{$sample: {size: count}}]).toArray();
    } catch (error) {
      console.error("Error retrieving random Hiragana:", error);
    }
  }
}

export default DBJapaneseAlphabet;
