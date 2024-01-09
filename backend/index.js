import dotenv from "dotenv";
import express from 'express'
import cors from 'cors';
import { createServer } from "http";
import { waterSampleRouter } from './models/waterSampleModel.js'
import { MongoClient } from "mongodb";
import { dbConnect } from "./db-mongoose.js";
dotenv.config();
const app = express();

// ----middlewares----
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -----routes-------
// app.use("/", router);
app.use(waterSampleRouter)

var port = process.env.PORT || 8000;

/**
 * Create HTTP server.
 */

const server = createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => {
  console.log(`Server running on http://localhost:8000`);
});