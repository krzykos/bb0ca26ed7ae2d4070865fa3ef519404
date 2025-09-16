import express, { Request, Response } from "express";

import * as database from "./database";
import { verifyJob } from "./verify-job";

const app = express();
app.use(express.json());
const port = 3000;

type PostStoryRequest = {
  title: string;
  contents: string;
};

app.post(
  "/stories",
  (req: Request<{}, {}, PostStoryRequest>, res: Response) => {
    try {
      const request = req.body;
      if (!request.title) {
        throw new Error("title missing");
      }
      if (!request.contents) {
        throw new Error("contents missing");
      }
      const story = database.add(request.title, request.contents);
      res.json(story);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
);

app.get("/stories", (req: Request, res: Response) => {
  res.json(database.queryAll());
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

setInterval(verifyJob, 5000);
