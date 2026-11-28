
import {
  areaConhecimentoModel,
  reflexaoAnualModel,
} from "../models/index.js";
import { tratarErro } from "../utils/errorHandler.js";

export const cadastrarReflexao = async (request, response) => {
  const {
    id_area,
    aprendizado_academico,
    melhorias_necessarias,
    conexoes_interdisciplinares,
    escola_pra_vida,
  } = request.body;

  if (
    !id_area ||
    !aprendizado_academico ||
    !melhorias_necessarias ||
    !conexoes_interdisciplinares ||
    !escola_pra_vida
  ) {
    return response.status(400).json({
      message: "Preencha os campos corretamente!",
    });
  }

  const usuarioId = request.usuarioId;
  const areaId = Number(id_area);

  if (!Number.isInteger(areaId) || areaId <= 0) {
    return response.status(400).json({ message: "ID da área inválido!" });
  }

  try {
    const areaExiste = await areaConhecimentoModel.findByPk(areaId);

    if (!areaExiste) {
      return response.status(404).json({
        message: "Área de conhecimento não encontrada!",
      });
    }

    const dados = {
      id_usuario: usuarioId,
      id_area: areaId,
      aprendizado_academico: aprendizado_academico.trim(),
      melhorias_necessarias: melhorias_necessarias.trim(),
      conexoes_interdisciplinares: conexoes_interdisciplinares.trim(),
      escola_pra_vida: escola_pra_vida.trim(),
    };

    const reflexaoCadastrada = await reflexaoAnualModel.create(dados);

    return response.status(201).json({
      message: "Reflexão cadastrada com sucesso!",
      reflexao: reflexaoCadastrada,
    });
  } catch (error) {
    return tratarErro(error, response);
  }
};

export const listarReflexoes = async (request, response) => {
  try {
    const reflexoes = await reflexaoAnualModel.findAll({
      where: { id_usuario: request.usuarioId },
    });

    return response.status(200).json(reflexoes);
  } catch (error) {
    return tratarErro(error, response);
  }
};

export const listarReflexoesPorId = async (request, response) => {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return response.status(400).json({ message: "ID inválido!" });
    }

    const reflexao = await reflexaoAnualModel.findOne({
      where: {
        id_reflexao: id,
        id_usuario: request.usuarioId,
      },
    });

    if (!reflexao) {
      return response.status(404).json({
        message: "Reflexão não encontrada!",
      });
    }

    return response.status(200).json(reflexao);
  } catch (error) {
    return tratarErro(error, response);
  }
};

export const atualizarReflexao = async (request, response) => {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return response.status(400).json({ message: "ID inválido!" });
    }

    const reflexao = await reflexaoAnualModel.findOne({
      where: {
        id_reflexao: id,
        id_usuario: request.usuarioId,
      },
    });

    if (!reflexao) {
      return response.status(404).json({
        message: "Reflexão não encontrada!",
      });
    }

    const {
      id_usuario,
      id_area,
      aprendizado_academico,
      melhorias_necessarias,
      conexoes_interdisciplinares,
      escola_pra_vida,
    } = request.body;

    if (id_usuario !== undefined) {
      return response.status(400).json({
        message: "Não é permitido alterar o usuário da reflexão!",
      });
    }

    const areaId = id_area !== undefined ? Number(id_area) : undefined;

    const dadosAtualizados = {
      id_area: areaId,
      aprendizado_academico: aprendizado_academico?.trim(),
      melhorias_necessarias: melhorias_necessarias?.trim(),
      conexoes_interdisciplinares: conexoes_interdisciplinares?.trim(),
      escola_pra_vida: escola_pra_vida?.trim(),
    };

    Object.keys(dadosAtualizados).forEach((campo) => {
      if (dadosAtualizados[campo] === undefined) {
        delete dadosAtualizados[campo];
      }
    });

    if (areaId !== undefined && (!Number.isInteger(areaId) || areaId <= 0)) {
      return response.status(400).json({ message: "ID da área inválido!" });
    }

    if (
      areaId !== undefined &&
      !(await areaConhecimentoModel.findByPk(areaId))
    ) {
      return response.status(404).json({
        message: "Área de conhecimento não encontrada!",
      });
    }

    await reflexao.update(dadosAtualizados);

    return response.status(200).json({
      message: "Reflexão atualizada com sucesso!",
      reflexao,
    });
  } catch (error) {
    return tratarErro(error, response);
  }
};

export const deletarReflexao = async (request, response) => {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return response.status(400).json({ message: "ID inválido!" });
    }

    const reflexao = await reflexaoAnualModel.findOne({
      where: {
        id_reflexao: id,
        id_usuario: request.usuarioId,
      },
    });

    if (!reflexao) {
      return response.status(404).json({
        message: "Reflexão não encontrada!",
      });
    }

    await reflexao.destroy();

    return response.status(204).send();
  } catch (error) {
    return tratarErro(error, response);
  }
};
