import { Application } from "express";
import roleRoutes from "./role.routes";
// import tutorialRoutes from "./tutorial.routes";
import homeRoutes from "./home.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/v1", homeRoutes);
    app.use("/v1/roles", roleRoutes);
    // app.use("/api/tutorials", tutorialRoutes);
  }
}