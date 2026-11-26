
import jwt from "jsonwebtoken";

export const createUserToken = (usuario, response) => {
  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "12h",
    }
  );

  return response.status(200).json({
    success: true,
    message: "Usuário autenticado com sucesso!",
    token,
    usuarioId: usuario.id,
  });
};
