import { Router } from "express";
import RolesController from "../controllers/roles.controller";

class RoleRoutes {
  router = Router();
  controller = new RolesController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Role
    this.router.post("/", this.controller.create);

    // Retrieve all Roles
    this.router.get("/", this.controller.findAll);

    // Retrieve a single Role with id
    this.router.get("/:id", this.controller.findOne);

    // Update a Tutorial with id
    this.router.put("/:id", this.controller.update);

    // Delete a Tutorial with id
    this.router.delete("/:id", this.controller.delete);

  }
}

export default new RoleRoutes().router;