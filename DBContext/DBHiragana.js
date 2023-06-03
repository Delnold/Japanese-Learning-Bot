// import DBMain from "./DBMain.js";
//
// class DBHiragana {
//   async retrieveRandomHiragana(db, count) {
//     try {
//       const collection = await db.collection("hiragana");
//       const randomHiragana = await collection.aggregate([{ $sample: { size: count } }]).toArray();
//       return randomHiragana;
//     } catch (error) {
//       console.error("Error retrieving random Hiragana:", error);
//     }
//   }
// }
//
// export default DBHiragana;
