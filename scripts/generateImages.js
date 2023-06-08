import fs from 'fs/promises';
import {createCanvas, registerFont} from 'canvas';
import DBMain from "../DBContext/DBMain.js";
import {dbConnectionString} from "../config/config.js";
import {dbName} from "../config/config.js";
import {collectionHiraganaName} from "../config/config.js";
import {collectionKatakanaName} from "../config/config.js";
import {collectionKanjiName} from "../config/config.js";
const hiraganaPathFolder = "./data_files/images/hiragana/letters/";
const katakanaPathFolder = "./data_files/images/katakana/letters/";
const kanjiPathFolder = "./data_files/images/kanji/letters/";
const canvasWidth = 200;
const canvasHeight = 200;
const fontPath = './data_files/images/font/NotoSansJP-Bold.ttf';
const fontSize = 100;
const fontColor = '#000000'; // Black

registerFont(fontPath, {family: 'Noto Sans JP'});

async function generateImage(Letter, imagePathFolder) {
  const path = `${imagePathFolder}${Letter}.png`;

  try {
    await fs.access(path);
    return `File: ${Letter}.png exists!`;
  } catch (error) {
    const canvasWidth = 100;
    const canvasHeight = 100;
    const fontSize = 20;
    const fontColor = 'black';

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const context = canvas.getContext('2d');

    context.font = `${fontSize}px 'Noto Sans JP'`;
    context.fillStyle = fontColor;
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    const x = canvasWidth / 2;
    const y = canvasHeight / 2;

    context.fillText(Letter, x, y);

    const imageBuffer = canvas.toBuffer();
    await fs.writeFile(path, imageBuffer);
    return path;
  }
}

const generateLetterImages = async (db, dbName, PathFolder, collectionName) => {
    try {
        await db.openConnection();
        const dbMain = db.client.db(dbName);
        const collection = dbMain.collection(collectionName);
        const cursor = collection.find({});
        const promises = [];

        for await (const res of cursor) {
            const promise = generateImage(res["character"], PathFolder)
                .then((pathSaved) => console.log(pathSaved))
                .catch((error) => console.log(`Error generating image for character ${res["character"]}: ${error}`));
            promises.push(promise);
        }
        await Promise.all(promises);
        return "Success!";
    } catch (error) {
        console.log(`Error creating Letter Images: ${error}`);
    } finally {
        await db.closeConnection();
    }
};

(async () => {
    try {
        const dbContextManager1 = new DBMain(dbConnectionString);
        const dbContextManager2 = new DBMain(dbConnectionString);
        const dbContextManager3 = new DBMain(dbConnectionString);

        await Promise.all([
            generateLetterImages(dbContextManager1, dbName, hiraganaPathFolder, collectionHiraganaName),
            generateLetterImages(dbContextManager2, dbName, katakanaPathFolder, collectionKatakanaName),
            generateLetterImages(dbContextManager3, dbName, kanjiPathFolder, collectionKanjiName)
        ]);
    } catch (error) {
        console.log(`Error generating letter images: ${error}`);
    }
})();
