import { DataTypes } from "sequelize";
import { conn } from "../config/conn.js";

export const projetoTrabalhoModel = conn.define(
  "projeto_trabalho",
  {
    id_projeto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuario",
        key: "id",
      },
      validate: {
        notEmpty: { msg: "O id do usuário é obrigatório" },
      },
    },
    id_area: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "area_conhecimento",
        key: "id_area",
      },
      validate: {
        notEmpty: { msg: "A área de conhecimento é obrigatória" },
      },
    },
    bimestre: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "O bimestre é obrigatório" },
        isInt: { msg: "O bimestre deve ser um número inteiro" },
      },
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "O título do projeto é obrigatório" },
      },
    },
    descricao_atividades: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "A descrição das atividades é obrigatória" },
      },
    },
  },
  {
    tableName: "projeto_trabalho",
    timestamps: true,
  }
);
