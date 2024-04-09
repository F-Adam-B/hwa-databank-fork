import fs from 'fs';
import path from 'path';

const storeUpload = async ({ createReadStream, filename }) => {
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

const updateImageUrls = (dataArray, baseUrl) => {
  return dataArray.map((item) => {
    if (item.imageUrl && item.imageUrl.startsWith('public/')) {
      item.imageUrl = `${baseUrl}${item.imageUrl.substring('public/'.length)}`;
    }
    return item;
  });
};

export { storeUpload, updateImageUrls };
