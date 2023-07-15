import fs from "fs/promises";
async function openPhotoAsync(path) {
  try {
    const fileHandle = await fs.open(path, 'r');
    const photoBuffer = await fileHandle.readFile();
    await fileHandle.close();
    return photoBuffer;
  } catch (error) {
    throw error;
  }
}

export default openPhotoAsync;