import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { router as waterSampleRouter } from './routes/waterSampleRouter.js';
import { dbConnect } from './db-mongoose.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/", router);
app.use('/api/', waterSampleRouter);

var port = process.env.PORT || 8000;

/**
 * Create HTTP server.
 */

const server = createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

dbConnect(process.env.DATABASE_URL);

server.listen(port, () => {
  console.log(`Server running on http://localhost:8000`);
});
