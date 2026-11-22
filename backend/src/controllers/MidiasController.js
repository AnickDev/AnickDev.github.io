import { projetoTrabalhoModel, midiaModel } from "../models/index.js";
import { tratarErro } from "../utils/errorHandler.js";

export const cadastrarMidia = async (request, response) => {
  const { id_projeto, url_arquivo } = request.body;

  if (!id_projeto || !url_arquivo) {
    return response
      .status(400)
      .json({ message: "Preencha os campos corretamente!" });
  }

  const projetoId = Number(id_projeto);

  if (!Number.isInteger(projetoId) || projetoId <= 0) {
    return response.status(400).json({ message: "ID do projeto inválido!" });
  }

  try {
    const projetoExiste = await projetoTrabalhoModel.findByPk(projetoId);

    if (!projetoExiste) {
      return response.status(404).json({
        message: "Projeto não encontrado!",
      });
    }
    const dados = {
      id_projeto: projetoId,
      url_arquivo,
    };

    const midia = await midiaModel.create(dados);
    return response
      .status(201)
      .json({ message: "Mídia cadastrada com sucesso!", midia });
  } catch (error) {
    return tratarErro(error, response);
  }
};
export const listarMidias = async (request, response) => {
  try {
    const midia = await midiaModel.findAll();

    return response.status(200).json(midia);
  } catch (error) {
    return tratarErro(error, response);
  }
};
export const listarMidiaPorId = async (request, response) => {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return response.status(400).json({ message: "ID inválido!" });
    }

    const midia = await midiaModel.findByPk(id);

    if (!midia) {
      return response.status(404).json({
        message: "Mídia não encontrada!",
      });
    }

    return response.status(200).json(midia);
  } catch (error) {
    return tratarErro(error, response);
  }
};
export const atualizarMidia = async (request, response) => {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return response.status(400).json({ message: "ID inválido!" });
    }

    const midia = await midiaModel.findByPk(id);

    if (!midia) {
      return response.status(404).json({
        message: "Mídia não encontrada!",
      });
    }

    const { id_projeto, url_arquivo } = request.body;

    const projetoId = id_projeto !== undefined ? Number(id_projeto) : undefined;

    const midiaAtualizada = {
      id_projeto: projetoId,
      url_arquivo,
    };

    Object.keys(midiaAtualizada).forEach((campo) => {
      if (midiaAtualizada[campo] === undefined) {
        delete midiaAtualizada[campo];
      }
    });

    if (projetoId !== undefined) {
      if (!Number.isInteger(projetoId) || projetoId <= 0) {
        return response
          .status(400)
          .json({ message: "ID do projeto inválido!" });
      }

      const projetoExiste = await projetoTrabalhoModel.findByPk(projetoId);

      if (!projetoExiste) {
        return response.status(404).json({
          message: "Projeto não encontrado!",
        });
      }
    }

    await midia.update(midiaAtualizada);

    return response
      .status(200)
      .json({ message: "Mídia atualizada com sucesso!", midia });
  } catch (error) {
    return tratarErro(error, response);
  }
};
export const deletarMidia = async (request, response) =>{
        try {
        const id = Number(request.params.id)

        if (!Number.isInteger(id) || id <= 0) {
      return response.status(400).json({ message: "ID inválido!" });
    }

    const midia = await midiaModel.findByPk(id)

    if (!midia) {
      return response.status(404).json({
        message: "Mídia não encontrada!",
      });
    }

    await midia.destroy();

    return response.status(204).send()
    } catch (error) {
        return tratarErro(error, response)
    }
}