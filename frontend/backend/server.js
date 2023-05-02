import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import taskRouter from "./routes/taskRouter.js";
import connectDB from "./database/connectDB.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const port = process.env.PORT || 5050;
const connectionString = process.env.MONGO_URL;

// Start MIDDLEWARES
app.use(cors());

app.use(express.json());

app.use("/tasks", taskRouter);

app.use("/", express.static(path.join(__dirname, "/dist")));

app.get("/*", (req, res) => res.sendFile(__dirname + "/dist/index.html"));

const startServer = async () => {
  try {
    await connectDB(connectionString);
    console.log("verbindung mit MONGODB hat geklaptt!");
    //
    app.listen(port, () => {
      console.log(`Port läuft auf Port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
