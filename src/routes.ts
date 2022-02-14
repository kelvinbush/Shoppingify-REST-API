import { Express, Request, Response } from "express";

function routes(app: Express) {
  app.get("/health-check", (req: Request, res: Response) =>
    res.send({ message: `We are live baby 😁😁` })
  );
}

export default routes;
