import path from 'path';
import { fileURLToPath } from 'url';
import routes from "./routes/routes.js";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { createClient } from 'redis';

dotenv.config(); // Load environment variables from .env file

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

export const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379' // redis in docker container
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

await redisClient.connect(); // connect to redis in docker container

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const corsOptions = {
  origin: CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Required for cloud deployment (Render, Railway, etc.) where a reverse proxy sits in front. Allows the rate limiter to see the real user's IP instead of the cloud provider's IP.
app.set('trust proxy', 1); 

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT);