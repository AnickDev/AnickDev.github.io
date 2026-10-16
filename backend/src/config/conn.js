import { Sequelize } from "sequelize"

export const conn = new Sequelize("portfolioSenai", "root", "123456789",{
    host: "localhost",
    dialect: "mysql"
})