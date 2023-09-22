import { DataSource } from "typeorm";
import { User } from "./entites/User";
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: '',
    database: "type_orm",
    entities: [User],
    // entities: ["src/entites/*{ts.js}"],
    synchronize: true,
    logging: false,

})