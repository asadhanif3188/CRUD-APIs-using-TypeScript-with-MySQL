import { Request, Response } from "express";
import Role from "../models/roles.model";
import rolesHelper from "../db-helpers/roles.helper";

export default class RolesController {
  async create(req: Request, res: Response) {
    if (!req.body.title) {
      res.status(400).send({
        status : false,
        message: "Role title cannot be empty!"
      });
      return;
    }

    try {
      const role : Role = req.body;
      const savedRole = await rolesHelper.save(role);

      // res.status(201).send(savedRole);
      res.status(201).send({
        status : true,
        message: "Role saved successfully."
      });
    } catch (err) {
      res.status(500).send({
        status : false,
        message: "Duplicate value for role is not allowed."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const title = typeof req.query.title === "string" ? req.query.title : "";

    try {
      const roles = await rolesHelper.retrieveAll({ title: title });

      res.status(200).send({
        status : true,
        roles: roles,
      });
    } catch (err) {
      res.status(500).send({
        status : false,
        message: "Some error occurred while retrieving roles."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const role = await rolesHelper.retrieveById(id);

      if (role) 
        res.status(200).send({
          status : true,
          role: role,
        });
      else
        res.status(404).send({
          status : false,
          message: `Cannot find role with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        status : false,
        message: `Error retrieving role with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let role: Role = req.body;
    role.id = parseInt(req.params.id);

    try {
      const num = await rolesHelper.update(role);

      if (num == 1) {
        res.status(200).send({
          status : true,
          message: "Role was updated successfully."
        });
      } else {
        res.status(500).send({
          status : false,
          message: `Cannot update role with id=${role.id}. Maybe role was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        status : false,
        message: `Error updating role with id=${role.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await rolesHelper.delete(id);

      if (num == 1) {
        res.status(200).send({
          status : true,
          message: "Role was deleted successfully!"
        });
      } else {
        res.status(500).send({
          status : false,
          message: `Cannot delete role with id=${id}. Maybe role was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        status : false,
        message: `Could not delete Role with id==${id}.`
      });
    }
  }

}