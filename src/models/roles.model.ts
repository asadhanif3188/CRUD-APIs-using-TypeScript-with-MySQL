import { RowDataPacket } from "mysql2"

export default interface IRole extends RowDataPacket {
  id?: number;
  title?: string;
}