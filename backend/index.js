import dotenv from "dotenv";
import express from 'express'
import cors from 'cors';
import { createServer } from "http";
// import { router } from "./routes/index.js";
dotenv.config();
const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/", router);

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