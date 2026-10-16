import { DataTypes } from "sequelize";
import { conn } from "../config/conn.js";

export const midiaModel = conn.define(
  "midia",
  {
    id_midia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_projeto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "projeto_trabalho", 
        key: "id_projeto",
      },
      validate: {
        notEmpty: { msg: "O id do projeto é obrigatório" },
      },
    },
    url_arquivo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "A URL do arquivo é obrigatória" },
        isUrl: { msg: "Informe um link/URL válido para o arquivo" },
      },
    },
  },
  {
    tableName: "midias",
    timestamps: true,
  }
);
