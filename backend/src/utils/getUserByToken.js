
import jwt from "jsonwebtoken";
import { usuarioModel } from "../models/index.js";
import { getToken } from "./getToken.js";

export const getUserByToken = async (request) => {
  const token = getToken(request);

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await usuarioModel.findByPk(decoded.id);

    return usuario;
  } catch (error) {
    return null;
  }
};
