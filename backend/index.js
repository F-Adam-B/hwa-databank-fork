import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
// import {expressGraphQL} from ('express-graphql');
import { schema } from './graphql/schema.js';
import cors from 'cors';
import { createServer } from 'http';
import { router as waterSampleRouter } from './routes/waterSampleRouter.js';
import { dbConnect } from './db-mongoose.js';
import { main } from './helpers/index.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', router);
// app.use('/', waterSampleRouter);
// const root = {
//   samples: () => {
//     return 'Hello World!!';
//   },
// };
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

var port = process.env.PORT || 8000;

/**
 * Create HTTP server.
 */

const server = createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

await dbConnect(process.env.DATABASE_URL);

// main();
server.listen(port, () => {
  console.log(`Server running on http://localhost:8000`);
});
