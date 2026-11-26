
import { usuarioModel } from "../models/index.js";
import { createUserToken } from "../utils/createUserToken.js";
import { tratarErro } from "../utils/errorHandler.js";
import bcrypt from "bcrypt";

export const login = async (request, response) => {
  const { email, senha } = request.body;

  try {
    if (!email || !senha) {
      return response.status(400).json({
        message: "E-mail e senha são obrigatórios!",
      });
    }

    const usuarioEncontrado = await usuarioModel
      .scope("comSenha")
      .findOne({
        where: { email },
      });

    if (!usuarioEncontrado) {
      return response.status(401).json({
        message: "Credenciais inválidas!",
      });
    }

    const comparaSenha = await bcrypt.compare(
      senha,
      usuarioEncontrado.senha
    );

    if (!comparaSenha) {
      return response.status(401).json({
        message: "Credenciais inválidas!",
      });
    }

    return createUserToken(usuarioEncontrado, response);

  } catch (error) {
    return tratarErro(error, response);
  }
};
