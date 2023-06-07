class DBJapaneseAlphabet {

  static async retrieveRandomCharacters(client, count, collectionName) {
    try {
      const db = await client.db("Japanese_Alphabet");
      const collection = await db.collection(collectionName);
      return await collection.aggregate([{ $sample: { size: count } }]).toArray();
    } catch (error) {
      console.error("Error retrieving random Hiragana:", error);
    }
  }
}

export default DBJapaneseAlphabet;
