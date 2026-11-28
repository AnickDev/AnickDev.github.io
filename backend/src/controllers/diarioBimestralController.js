
import {
  diarioBimestralModel,
  areaConhecimentoModel,
} from "../models/index.js";
import { tratarErro } from "../utils/errorHandler.js";

export const cadastrarDiario = async (request, response) => {
  const {
    id_area,
    bimestre,
    resumo_teorico,
    registro_atividades,
    reflexao_pratica,
    autoavaliacao,
  } = request.body;

  if (
    !id_area ||
    !bimestre ||
    !resumo_teorico ||
    !registro_atividades ||
    !reflexao_pratica ||
    !autoavaliacao
  ) {
    return response.status(400).json({
      message: "Preencha os campos corretamente!",
    });
  }

  const usuarioId = request.usuarioId;
  const areaId = Number(id_area);
  const numeroBimestre = Number(bimestre);

  if (!Number.isInteger(areaId) || areaId <= 0) {
    return response.status(400).json({ message: "ID da área inválido!" });
  }

  if (
    !Number.isInteger(numeroBimestre) ||
    numeroBimestre < 1 ||
    numeroBimestre > 4
  ) {
    return response.status(400).json({
      message: "Informe um bimestre válido!",
    });
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
      bimestre: numeroBimestre,
      resumo_teorico: resumo_teorico.trim(),
      registro_atividades: registro_atividades.trim(),
      reflexao_pratica: reflexao_pratica.trim(),
      autoavaliacao: autoavaliacao.trim(),
    };

    const diarioCadastrado = await diarioBimestralModel.create(dados);

    return response.status(201).json({
      message: "Diário Bimestral cadastrado com sucesso!",
      diarioCadastrado,
    });
  } catch (error) {
    return tratarErro(error, response);
  }
};

export const listarDiarios = async (request, response) => {
  try {
    const diarios = await diarioBimestralModel.findAll({
      where: { id_usuario: request.usuarioId },
    });

    return response.status(200).json(diarios);
  } catch (error) {
    return tratarErro(error, response);
  }
};

export const listarDiarioPorId = async (request, response) => {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return response.status(400).json({ message: "ID inválido!" });
    }

    const diario = await diarioBimestralModel.findOne({
      where: {
        id_diario: id,
        id_usuario: request.usuarioId,
      },
    });

    if (!diario) {
      return response.status(404).json({
        message: "Diário Bimestral não encontrado!",
      });
    }

    return response.status(200).json(diario);
  } catch (error) {
    return tratarErro(error, response);
  }
};

export const atualizarDiario = async (request, response) => {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return response.status(400).json({ message: "ID inválido!" });
    }

    const diario = await diarioBimestralModel.findOne({
      where: {
        id_diario: id,
        id_usuario: request.usuarioId,
      },
    });

    if (!diario) {
      return response.status(404).json({
        message: "Diário não encontrado!",
      });
    }

    const {
      id_usuario,
      id_area,
      bimestre,
      resumo_teorico,
      registro_atividades,
      reflexao_pratica,
      autoavaliacao,
    } = request.body;

    if (id_usuario !== undefined) {
      return response.status(400).json({
        message: "Não é permitido alterar o usuário do diário!",
      });
    }

    const areaId = id_area !== undefined ? Number(id_area) : undefined;
    const numeroBimestre =
      bimestre !== undefined ? Number(bimestre) : undefined;

    const diarioAtualizado = {
      id_area: areaId,
      bimestre: numeroBimestre,
      resumo_teorico: resumo_teorico?.trim(),
      registro_atividades: registro_atividades?.trim(),
      reflexao_pratica: reflexao_pratica?.trim(),
      autoavaliacao: autoavaliacao?.trim(),
    };

    Object.keys(diarioAtualizado).forEach((campo) => {
      if (diarioAtualizado[campo] === undefined) {
        delete diarioAtualizado[campo];
      }
    });

    if (areaId !== undefined && (!Number.isInteger(areaId) || areaId <= 0)) {
      return response.status(400).json({ message: "ID da área inválido!" });
    }

    if (
      numeroBimestre !== undefined &&
      (!Number.isInteger(numeroBimestre) ||
        numeroBimestre < 1 ||
        numeroBimestre > 4)
    ) {
      return response.status(400).json({
        message: "Informe um bimestre válido!",
      });
    }

    if (
      areaId !== undefined &&
      !(await areaConhecimentoModel.findByPk(areaId))
    ) {
      return response.status(404).json({
        message: "Área de conhecimento não encontrada!",
      });
    }

    await diario.update(diarioAtualizado);

    return response.status(200).json({
      message: "Diário atualizado!",
      diario,
    });
  } catch (error) {
    return tratarErro(error, response);
  }
};

export const deletarDiario = async (request, response) => {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return response.status(400).json({ message: "ID inválido!" });
    }

    const diario = await diarioBimestralModel.findOne({
      where: {
        id_diario: id,
        id_usuario: request.usuarioId,
      },
    });

    if (!diario) {
      return response.status(404).json({
        message: "Diário não encontrado!",
      });
    }

    await diario.destroy();

    return response.status(204).send();
  } catch (error) {
    return tratarErro(error, response);
  }
};
