import { areaConhecimentoModel } from "../models/index.js";
import { tratarErro } from "../utils/errorHandler.js";

export const cadastrarArea = async (request, response) => {
  const { nome_area } = request.body;

if (typeof nome_area !== "string") {
  return response.status(400).json({
    message: "O nome da área deve ser um texto!",
  });
}

if (!nome_area.trim()) {
  return response.status(400).json({
    message: "Preencha o nome da área corretamente!",
  });
}

  try {
    const dados = {
        nome_area: nome_area.trim(),
    }

   const areaCriada = await areaConhecimentoModel.create(dados)

   return response.status(201).json({message: "Área cadastrada com sucesso!", area: areaCriada})
  } catch (error) {
    return tratarErro(error, response)
  }
};
