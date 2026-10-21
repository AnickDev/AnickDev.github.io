import { DataTypes } from "sequelize";
import { conn } from "../config/conn.js";

export const reflexaoAnualModel = conn.define(
  "reflexao_anual",
  {
    id_reflexao: {
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
    aprendizado_academico: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "O campo aprendizado acadêmico é obrigatório" },
      },
    },
    melhorias_necessarias: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "O campo melhorias necessárias é obrigatório" },
      },
    },
    conexoes_interdisciplinares: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "O campo conexões interdisciplinares é obrigatório" },
      },
    },
    escola_pra_vida: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "O campo escola para a vida é obrigatório" },
      },
    },
  },
  {
    tableName: "reflexao_anual",
    timestamps: true, 
  }
);
