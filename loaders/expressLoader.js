//this file is responsible for setting up the express server
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import morgan from "morgan";

export default async (app) => {
  //body parser middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("tiny"));

  //security middlewares
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message:
        "You Have Reached the MAXIMUM number of Requests. Please wait for a while.",
    })
  );
  app.use(helmet());
  app.use(cors());

  //default http route
  app.get("/", (req, res) => {
    console.log("BitsCrunch Assignment Test");
    res.json({ message: "BitsCrunch Assignment Test" });
  });

  
};
