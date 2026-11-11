import {
  projetoTrabalhoModel,
  usuarioModel,
  areaConhecimentoModel,
} from "../models/index.js";
import { tratarErro } from "../utils/errorHandler.js";

export const cadastrarProjeto = async (request, response) => {
  const { id_usuario, id_area, bimestre, titulo, descricao_atividades } =
    request.body;

  if (
    !id_usuario ||
    !id_area ||
    !bimestre ||
    !titulo ||
    !descricao_atividades
  ) {
    return response
      .status(400)
      .json({ message: "Preencha os campos corretamente!" });
  }

  const usuarioId = Number(id_usuario);
  const areaId = Number(id_area);
  const numeroBimestre = Number(bimestre);

  if (!Number.isInteger(areaId) || areaId <= 0) {
    return response.status(400).json({ message: "ID da área inválido!" });
  }

  if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
    return response.status(400).json({ message: "ID do usuário inválido!" });
  }

  if (
    !Number.isInteger(numeroBimestre) ||
    numeroBimestre < 1 ||
    numeroBimestre > 4
  ) {
    return response
      .status(400)
      .json({ message: "Informe um bimestre válido!" });
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
      bimestre: numeroBimestre,
      titulo: titulo.trim(),
      descricao_atividades: descricao_atividades.trim(),
    };

    const projetoCadastrado = await projetoTrabalhoModel.create(dados);

    return response.status(201).json({
      message: "Projeto cadastrado com sucesso!",
      Projeto: projetoCadastrado,
    });
  } catch (error) {
    return tratarErro(error, response);
  }
};
export const listarProjeto = async (request, response) => {
  try {
    const projeto = await projetoTrabalhoModel.findAll();

    response.status(200).json(projeto);
  } catch (error) {
    return tratarErro(error, response);
  }
};
export const listarProjetoPorId = async (request, response) => {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return response.status(400).json({ message: "ID inválido!" });
    }

    const projeto = await projetoTrabalhoModel.findByPk(id);
    if (!projeto) {
      return response.status(404).json({
        message: "Projeto não encontrado!",
      });
    }
    return response.status(200).json(projeto);
  } catch (error) {
    return tratarErro(error, response);
  }
};
export const atualizarProjeto = async (request, response) => {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return response.status(400).json({ message: "ID inválido!" });
    }

    const projeto = await projetoTrabalhoModel.findByPk(id);

    if (!projeto) {
      return response.status(404).json({
        message: "Projeto não encontrado!",
      });
    }

    const { id_usuario, id_area, bimestre, titulo, descricao_atividades } =
      request.body;

    const usuarioId = id_usuario !== undefined ? Number(id_usuario) : undefined;
    const areaId = id_area !== undefined ? Number(id_area) : undefined;
    const numeroBimestre =
      bimestre !== undefined ? Number(bimestre) : undefined;

    const projetoAtualizado = {
      id_usuario: usuarioId,
      id_area: areaId,
      bimestre: numeroBimestre,
      titulo: typeof titulo === "string" ? titulo.trim() : titulo,
      descricao_atividades:
        typeof descricao_atividades === "string"
          ? descricao_atividades.trim()
          : descricao_atividades,
    };

    Object.keys(projetoAtualizado).forEach((campo) => {
      if (projetoAtualizado[campo] === undefined) {
        delete projetoAtualizado[campo];
      }
    });

    if (
      usuarioId !== undefined &&
      (!Number.isInteger(usuarioId) || usuarioId <= 0)
    ) {
      return response.status(400).json({ message: "ID do usuário inválido!" });
    }

    if (areaId !== undefined && (!Number.isInteger(areaId) || areaId <= 0)) {
      return response.status(400).json({ message: "ID da área inválido!" });
    }

    if (
      numeroBimestre !== undefined &&
      (!Number.isInteger(numeroBimestre) ||
        numeroBimestre < 1 ||
        numeroBimestre > 4)
    ) {
      return response
        .status(400)
        .json({ message: "Informe um bimestre válido!" });
    }

    if (usuarioId !== undefined && !(await usuarioModel.findByPk(usuarioId))) {
      return response.status(404).json({
        message: "Usuário não encontrado!",
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

    await projeto.update(projetoAtualizado);

    return response.status(200).json(projeto);
  } catch (error) {
    return tratarErro(error, response);
  }
};
