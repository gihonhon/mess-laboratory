import prisma from "./lib/prisma";
import express, { Request, Response } from "express";
import createHttpError from "http-errors";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import recipesRoute from "./routes/recipes";

const app = express();
dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("NodeJS + Express + Typescript App Up! 👍");
});

app.use("api/recipes", recipesRoute);

app.use((req: Request, res: Response, next: Function) => {
  next(createHttpError(404));
});

app.listen(8800, () =>
  console.log(`⚡️[server]: Server is running att https://localhost:8800`)
);
