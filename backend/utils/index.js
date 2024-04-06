import fs from 'fs';
import path from 'path';

export const storeUpload = async ({ createReadStream, filename }) => {
  const uploadDir = './public/images';
  const filePath = path.join(uploadDir, filename);

  await new Promise((resolve, reject) => {
    createReadStream()
      .on('error', (error) => reject(error))
      .pipe(fs.createWriteStream(filePath))
      .on('finish', () => resolve());
  });

  return filePath;
};
