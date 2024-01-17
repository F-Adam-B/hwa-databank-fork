import mongoose from 'mongoose';
const dbConnect = async (url = DATABASE_URL) => {
  try {
    await mongoose.connect(url);
    console.log('Successfully connected to MongoDB');
  } catch (err) {
    console.error('Mongoose failed to connect: ', err);
    throw err;
  }
};

const dbDisconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Failed to disconnect Mongoose: ', err);
  }
};

export { dbConnect, dbDisconnect };
