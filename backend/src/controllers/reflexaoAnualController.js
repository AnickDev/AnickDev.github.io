import {
  usuarioModel,
  areaConhecimentoModel,
  reflexaoAnualModel,
} from "../models/index.js";
import { tratarErro } from "../utils/errorHandler.js";

export const cadastrarReflexao = async (request, response) => {
  const {
    id_usuario,
    id_area,
    aprendizado_academico,
    melhorias_necessarias,
    conexoes_interdisciplinares,
    escola_pra_vida,
  } = request.body;

  if (
    !id_usuario ||
    !id_area ||
    !aprendizado_academico ||
    !melhorias_necessarias ||
    !conexoes_interdisciplinares ||
    !escola_pra_vida
  ) {
    return response
      .status(400)
      .json({ message: "Preencha os campos corretamente!" });
  }

  const usuarioId = Number(id_usuario);
  const areaId = Number(id_area);

  if (!Number.isInteger(areaId) || areaId <= 0) {
    return response.status(400).json({ message: "ID da área inválido!" });
  }

  if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
    return response.status(400).json({ message: "ID do usuário inválido!" });
  }

  try {
    const usuarioExiste = await usuarioModel.findByPk(usuarioId);

    if (!usuarioExiste) {
      return response.status(404).json({
        message: "Usuário não encontrado!",
      });
    }

    const areaExiste = await areaConhecimentoModel.findByPk(areaId);

    if (!areaExiste) {
      return response.status(404).json({
        message: "Área de conhecimento não encontrada!",
      });
    }

    const dados = {
      id_usuario: usuarioId,
      id_area: areaId,
      aprendizado_academico: aprendizado_academico?.trim(),
      melhorias_necessarias: melhorias_necessarias?.trim(),
      conexoes_interdisciplinares: conexoes_interdisciplinares?.trim(),
      escola_pra_vida: escola_pra_vida?.trim(),
    };

    const reflexaoCadastrada = await reflexaoAnualModel.create(dados);

    return response.status(201).json({
      message: "Reflexão cadastrada com sucesso!",
      reflexão: reflexaoCadastrada,
    });
  } catch (error) {
    return tratarErro(error, response);
  }
};
