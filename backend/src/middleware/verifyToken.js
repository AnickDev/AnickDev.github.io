import jwt from "jsonwebtoken";
import { getToken } from "../utils/getToken.js";

export const verifyToken = (request, response, next) => {
  const token = getToken(request);

  if (!token) {
    return response.status(401).json({
      message: "Acesso negado! Token não fornecido.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    request.usuarioId = decoded.id;

    next();
  } catch (error) {
    return response.status(401).json({
      message: "Token inválido ou expirado!",
    });
  }
};
