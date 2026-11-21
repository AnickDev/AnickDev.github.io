import {
  diarioBimestralModel,
  areaConhecimentoModel,
  usuarioModel,
} from "../models/index.js";
import { tratarErro } from "../utils/errorHandler.js";

export const cadastrarDiario = async (request, response) => {
  const {
    id_usuario,
    id_area,
    bimestre,
    resumo_teorico,
    registro_atividades,
    reflexao_pratica,
    autoavaliacao,
  } = request.body;

  if (
    !id_usuario ||
    !id_area ||
    !bimestre ||
    !resumo_teorico ||
    !registro_atividades ||
    !reflexao_pratica ||
    !autoavaliacao
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
        resumo_teorico: resumo_teorico.trim(),
        registro_atividades: registro_atividades.trim(),
        reflexao_pratica: resumo_teorico.trim(),
        autoavaliacao: autoavaliacao.trim(),
    };

    const diarioCadastrado = await diarioBimestralModel.create(dados);

    return response.status(201).json({
        message: "Diário Bimestral cadstrado com sucesso!",
        diarioCadastrado
    })
  } catch (error) {
    return tratarErro(error, response);
  }
};
export const listarDiarios = async (request, response) =>{
    try {
        const diario = await diarioBimestralModel.findAll();

       return response.status(200).json(diario);
    } catch (error) {
        return tratarErro(error, response)
    }
}
