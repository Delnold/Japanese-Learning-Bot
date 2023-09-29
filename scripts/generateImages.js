import fs from 'fs/promises';
import {createCanvas, registerFont} from 'canvas';
import {collectionNames} from "../core/config.js";
import {dbConnections} from "../core/dbMongoConnections.js";
const hiraganaPathFolder = "./data/images/hiragana/letters/";
const katakanaPathFolder = "./data/images/katakana/letters/";
const kanjiPathFolder = "./data/images/kanji/letters/";

const canvasWidth = 200;
const canvasHeight = 200;
const fontPath = './data/images/font/NotoSansJP-Bold.ttf';
const fontSize = 100;
const fontColor = '#000000'; // Black

registerFont(fontPath, {family: 'Noto Sans JP'});

async function generateImage(Letter, imagePathFolder) {
  const path = `${imagePathFolder}${Letter}.png`;

  try {
    await fs.access(path);
    return `File: ${Letter}.png exists!`;
  } catch (error) {
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

const generateLetterImages = async (db, PathFolder, collectionName) => {
    try {
        const collection = db.collection(collectionName);
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
    }
};

(async () => {
    try {
        await Promise.all([
            generateLetterImages(dbConnections.JpAlphabet, hiraganaPathFolder, collectionNames.hiragana),
            generateLetterImages(dbConnections.JpAlphabet, katakanaPathFolder, collectionNames.katakana),
            generateLetterImages(dbConnections.JpAlphabet, kanjiPathFolder, collectionNames.kanji)
        ]);
    } catch (error) {
        console.log(`Error generating letter images: ${error}`);
    }
})();
