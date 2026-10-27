import { usuarioModel } from "../models/index.js";
import { tratarErro } from "../utils/errorHandler.js";
import bcrypt from "bcrypt"

export const cadastrarUsuario = async (request, response) =>{
const {nome, email, senha, validarSenha, ano_letivo, serie_turma, itinerario, expectativas_pessoais, foto_perfil} = request.body
// console.log(request.body)

if(!request.body.nome || !request.body.email){
    return response.status(400).json({message: "Preencha os campos corretamente!"})
}

if(!senha){
    return response.status(422).json({message: "A senha é obrigatória"})
}

if(senha.length < 8 || senha.length > 100){
    return response.status(422).json({message: "A senha deve ter entre 8 e 100 caracteres"})
}

if(senha !== validarSenha){
    return response.status(400).json({message: "Usuário ou senha incorretos"})
}

try {
    const salt = bcrypt.genSaltSync(12)
    // console.log(salt)
    const passwordHash = bcrypt.hashSync(senha, salt)
    // console.log(passwordHash)

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
    response.status(201).json({message:"Cadastro feito com sucesso!"})
} catch (error) {
    return tratarErro(error, response)
}

}
export const listarUsuario = async (request, response) =>{
    try {
        const usuarios = await usuarioModel.findAll()

        response.status(200).json(usuarios)
    } catch (error) {
        return tratarErro(error, response)
    }
}
export const buscarUsuarioPorId = async (request, response) =>{
     try {
        const id = Number(request.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return response.status(400).json({message: "ID inválido!"});
        }

        const usuario = await usuarioModel.findByPk(id);

        if (!usuario) {
            return response.status(404).json({
                message: "Usuário não encontrado!"
            });
        }
        return response.status(200).json(usuario);
    } catch (error) {
        return tratarErro(error, response);
    }
}