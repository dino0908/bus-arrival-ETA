import path from 'path';
import { fileURLToPath } from 'url';
import routes from "./routes/routes.js";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

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
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT);