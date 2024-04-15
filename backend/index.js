import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { dbConnect } from './db-mongoose.js';
import typeDefs from './graphql/types.js';
import resolvers from './graphql/resolvers.js';

const startApolloServer = async (typeDefs, resolvers) => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  app.use(graphqlUploadExpress());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    uploads: false,
  });

  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  var port = process.env.PORT || 8000;
  (async () => {
    await dbConnect(process.env.DATABASE_URL);
  })();

  app.listen(port, () => {
    console.log(`Server running on http://localhost:8000`);
  });
};

startApolloServer(typeDefs, resolvers);
