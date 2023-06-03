import fs from 'fs';
import {createCanvas, registerFont} from 'canvas';
import DBMain from "../DBContext/DBMain.js";
import 'dotenv/config';

const dbName = "Japanese_Alphabet";
const collectionHiraganaName = "Hiragana";
const collectionKatakanaName = "Katakana";
const collectionKanjiName = "Kanji";
const hiraganaPathFolder = "./images/hiragana/letters/";
const katakanaPathFolder = "./images/katakana/letters/";
const kanjiPathFolder = "./images/kanji/letters/";
const canvasWidth = 200;
const canvasHeight = 200;
const fontPath = './images/font/SawarabiGothic-Regular.ttf';
const fontSize = 100;
const fontColor = '#000000'; // Black

// Register the font
registerFont(fontPath, {family: 'SawarabiGothic-Regular'});

// Function to generate and save the image
async function generateImage(Letter, imagePathFolder) {
    return new Promise((resolve, reject) => {
        const canvas = createCanvas(canvasWidth, canvasHeight);
        const context = canvas.getContext('2d');

        // Set the font properties
        context.font = `${fontSize}px 'SawarabiGothic-Regular'`;
        context.fillStyle = fontColor;
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        // Calculate the position to center the letter on the canvas
        const x = canvasWidth / 2;
        const y = canvasHeight / 2;

        // Draw the letter on the canvas
        context.fillText(Letter, x, y);

        // Save the canvas as an image file
        const imageBuffer = canvas.toBuffer();
        const imagePath = `${imagePathFolder}${Letter}.png`;
        fs.writeFile(imagePath, imageBuffer, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(imagePath);
            }
        });
    });
}

const generateLetterImages = async (db, dbName, PathFolder, collectionName) => {
    try {
        await db.openConnection();
        const dbMain = db.client.db(dbName);
        const collection = dbMain.collection(collectionName);
        const cursor = collection.find({});

        // Create an array to store the promises
        const promises = [];

        for await (const res of cursor) {
            const promise = generateImage(res["character"], PathFolder)
                .then((pathSaved) => console.log(pathSaved))
                .catch((error) => console.log(`Error generating image for character ${res["character"]}: ${error}`));
            promises.push(promise);
        }

        // Wait for all promises to resolve
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
        const dbContextManager1 = new DBMain(process.env.CONNECTION_STRING);
        const dbContextManager2 = new DBMain(process.env.CONNECTION_STRING);
        const dbContextManager3 = new DBMain(process.env.CONNECTION_STRING);

        await Promise.all([
            generateLetterImages(dbContextManager1, dbName, hiraganaPathFolder, collectionHiraganaName),
            generateLetterImages(dbContextManager2, dbName, katakanaPathFolder, collectionKatakanaName),
            generateLetterImages(dbContextManager3, dbName, kanjiPathFolder, collectionKanjiName)
        ]);
    } catch (error) {
        console.log(`Error generating letter images: ${error}`);
    }
})();
