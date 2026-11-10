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
export const listarProjeto = async (request, response) =>{
    try {
        const projeto = await projetoTrabalhoModel.findAll();

        response.status(200).json(projeto);
    } catch (error) {
        return tratarErro(error, response)
    }
};
