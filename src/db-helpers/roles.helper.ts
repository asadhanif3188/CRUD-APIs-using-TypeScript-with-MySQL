import { ResultSetHeader } from "mysql2";
import connection from "../db";

import Role from "../models/roles.model";

interface IRolesHelper {
    save(role: Role): Promise<Role>;
    retrieveAll(searchParams: {title: string}): Promise<Role[]>;
    retrieveById(roleId: number): Promise<Role | undefined>;
    update(role: Role): Promise<number>;
    delete(roleId: number): Promise<number>;
}


class RolesHelper implements IRolesHelper {

  readonly tableName: string = "roles";
 
  save(role: Role): Promise<Role> {
      return new Promise((resolve, reject) => {
        connection.query<ResultSetHeader>(
          `INSERT INTO ${this.tableName} (title) VALUES(?)`,
          [role.title],
          (err, res) => {
            if (err) reject(err);
            else
              this.retrieveById(res.insertId)
                .then((role) => resolve(role!))
                .catch(reject);
          }
        );
      });
  }

  retrieveAll(searchParams: {title?: string}): Promise<Role[]> {
    let query: string = `SELECT * FROM ${this.tableName}`;
    let condition: string = "";

    if (searchParams?.title)
      condition += `LOWER(title) LIKE '%${searchParams.title}%'`

    if (condition.length)
      query += " WHERE " + condition;

    return new Promise((resolve, reject) => {
      connection.query<Role[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(roleId: number): Promise<Role> {
      return new Promise((resolve, reject) => {
        connection.query<Role[]>(
          `SELECT * FROM ${this.tableName} WHERE id = ?`,
          [roleId],
          (err, res) => {
            if (err) reject(err);
            else resolve(res?.[0]);
          }
        );
      });
  }

  update(role: Role): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        `UPDATE ${this.tableName} SET title = ? WHERE id = ?`,
        [role.title, role.id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  delete(roleId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        `DELETE FROM ${this.tableName} WHERE id = ?`,
        [roleId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

} // end of class 

export default new RolesHelper();
