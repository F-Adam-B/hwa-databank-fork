// Define a reusable db connection middleware
const withCollection = (dbName, collectionName) => (handler) => async (req, res, next) => {
  const dbClient = await connectDb();
  const db = dbClient.db(dbName);
  const collection = db.collection(collectionName);

  try {
    await handler(req, res, next, collection);
  } catch (error) {
    next(error);
  } finally {
    await dbClient.close();
  }
};

  export { withCollection }