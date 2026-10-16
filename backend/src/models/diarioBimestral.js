import { DataTypes } from "sequelize";
import { conn } from "../config/conn.js";

export const diarioBimestralModel = conn.define(
  "diario_bimestral",
  {
    id_diario: {
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
    resumo_teorico: {
      type: DataTypes.TEXT, 
      allowNull: false,
      validate: {
        notEmpty: { msg: "O resumo teórico é obrigatório" },
      },
    },
    registro_atividades: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "O registro de atividades é obrigatório" },
      },
    },
    reflexao_pratica: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "A reflexão prática é obrigatória" },
      },
    },
    autoavaliacao: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "A autoavaliação é obrigatória" },
      },
    },
  },
  {
    tableName: "diarios_bimestrais",
    timestamps: true, // 
  }
);
