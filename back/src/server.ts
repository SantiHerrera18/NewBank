import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes";
import {
  CustomErrorInterface,
  ErrorResponse,
} from "./interfaces/errorResponse";

const server: Application = express();

server.use(morgan("dev"));
server.use(cors());
server.use(express.json());
server.use(router);

server.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: unknown, req: Request, res: Response, next: NextFunction) => {
    const err = error as CustomErrorInterface;
    const errorMessage: ErrorResponse = {
      message: "Server error",
      details:
        error instanceof Error
          ? err.detail
            ? err.detail
            : error.message
          : "Unknown error",
    };
    if (err.code === 404) {
      res
        .status(404)
        .json({ message: errorMessage.message, details: errorMessage.details });
    } else res.status(400).json(errorMessage);
  }
);

export default server;
