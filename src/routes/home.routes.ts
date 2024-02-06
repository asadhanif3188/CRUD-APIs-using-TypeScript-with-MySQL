import { Router } from "express";
import { welcome, healthcheck } from "../controllers/home.controller";

class HomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", welcome);
    this.router.get("/healthcheck", healthcheck);
  }
}

export default new HomeRoutes().router;