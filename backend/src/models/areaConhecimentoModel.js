import { DataTypes } from "sequelize";
import { conn } from "../config/conn.js";

export const areaConhecimentoModel = conn.define(
  "area_conhecimento",
  {
    id_area: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_area: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Já existe uma área de conhecimento cadastrada com esse nome",
      },
      validate: {
        notEmpty: {
          msg: "O nome da área de conhecimento é obrigatório",
        },
      },
    },
  },
  {
    tableName: "area_conhecimento",
    timestamps: false,
  }
);
