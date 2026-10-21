import { usuarioModel } from "../models/index.js";
import { tratarErro } from "../utils/errorHandler.js";
import bcrypt from "bcrypt"

export const cadastrarUsuario = async (request, response) =>{
    const {nome, email, senha, verificarSenha, ano_letivo, serie_turma, itinerario, expectativas_pessoais, foto_perfil} = req.body

    if (senha !== verificarSenha){
        return response
        .status(401)
        .json({message: "As senhas precisam ser iguais"});
    }

    try {
        const salt = bcrypt.genSaltSync(12)
        const passwordHash = bcrypt.hashSync(senha, salt)

        const dados = {
            nome,
            email,
            senha: passwordHash,
            ano_letivo,
            serie_turma,
            itinerario,
            expectativas_pessoais,
            foto_perfil,
        }

        const usuario = await usuarioModel.create(dados)
        
    } catch (error) {
        return tratarErro(error, response)
    }
}