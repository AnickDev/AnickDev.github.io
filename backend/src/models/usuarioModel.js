import { DataTypes } from "sequelize";
import { conn } from "../config/conn.js";

export const usuarioModel = conn.define(
  "usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "O nome é obrigatório",
        },
        len: {
          args: [2, 100],
          msg: "O nome deve possuir de 2 a 100 caracteres",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Já existe um usuário cadastrado com esse e-mail",
      },
      validate: {
        notEmpty: {
          msg: "O e-mail é obrigatório",
        },
        isEmail: {
          msg: "Informe um email válido",
        },
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "A senha é obrigatória",
        },
        len: {
          args: [8, 100],
          msg: "A senha deve possuir entre 8 e 100 caracteres",
        },
      },
    },
    ano_letivo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "O ano letivo é obrigatório",
        },
        isInt: {
          msg: "O ano letivo deve ser um número válido",
        },
      },
    },
    serie_turma: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "A série/turma é obrigatória",
        },
      },
    },
    itinerario: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "O itinerário é obrigatório",
        },
      },
    },
    expectativas_pessoais: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foto_perfil: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://cdn-icons-png.flaticon.com/512/9706/9706583.png",
    },
  },
  {
    tableName: "usuario",
    timestamps: true,

    defaultScope: {
      attributes: { exclude: ["senha"] },
    },
    scopes: {
      comSenha: {
        attributes: {},
      },
    },
  },
);
