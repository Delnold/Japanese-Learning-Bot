import fs from 'fs';
import {createCanvas, registerFont} from 'canvas';
import DBMain from "../DBContext/DBMain.js";
import 'dotenv/config';
const dbName = "Japanese_Alphabet"
const collectionHiraganaName = "Hiragana"
const collectionKatakanaName = "katakana"
const collectionKanjiName = "kanji"
const hiraganaPathFolder = "./images/hiragana/letters/"
const katakanaPathFolder = "./images/katakana/letters/"
const kanjiPathFolder = "./images/kanji/letters/"
const canvasWidth = 200;
const canvasHeight = 200;
const fontPath = './images/font/SawarabiGothic-Regular.ttf';
const fontSize = 100;
const fontColor = '#000000'; // Black

const dbContextManager = new DBMain(process.env.CONNECTION_STRING)


// Register the font
registerFont(fontPath, {family: 'SawarabiGothic-Regular'});

// Function to generate and save the image
async function generateImage(Letter, imagePathFolder) {
    const canvas = await createCanvas(canvasWidth, canvasHeight);
    const context = await canvas.getContext('2d');

    // Set the font properties
    context.font = `${fontSize}px 'SawarabiGothic-Regular'`;
    context.fillStyle = fontColor;
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // Calculate the position to center the letter on the canvas
    const x = canvasWidth / 2;
    const y = canvasHeight / 2;

    // Draw the letter on the canvas
    await context.fillText(Letter, x, y);

    // Save the canvas as an image file
    const imageBuffer = await canvas.toBuffer();
    const imagePath = `${imagePathFolder}${Letter}.png`;
    fs.writeFileSync(imagePath, imageBuffer);

    return imagePath;
}

const generateHiragana = async (db, hiraganaPathFolder, dbHiraganaName, dbName) => {
    try {
        await db.openConnection()
        const dbMain = db.client.db(dbName)
        const collectionHiragana = dbMain.collection("Hiragana");
        const cursor = collectionHiragana.find({})
         for await (const res of cursor) {
           generateImage(res["character"], hiraganaPathFolder).then((pathSaved) => console.log(pathSaved))
        }
    } catch (error) {
        console.log(`Erorr creating Hiragana Images!: ${error}`)
    } finally {
        await db.closeConnection()
    }

}
generateHiragana(dbContextManager, hiraganaPathFolder, collectionHiraganaName, dbName)
