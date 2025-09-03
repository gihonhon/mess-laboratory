import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import createHttpError from "http-errors";
import authRoute from "./routes/authRoute.js";
import recipesRoute from "./routes/recipesRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.APP_PORT;

app.use(cors());
app.use(express.json());

// Main Path Route
app.get("/", (req, res) => {
  res.send("Your Connected!!");
});

// Routes
app.use("/auth", authRoute);
app.use(recipesRoute);
app.use((req, res, next) => {
  next(createHttpError(404));
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
