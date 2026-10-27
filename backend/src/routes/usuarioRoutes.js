import { Router } from "express";
import { atualizarUsuario, buscarUsuarioPorId, cadastrarUsuario, deletarUsuario, listarUsuario } from "../controllers/usuarioController.js";

const router = Router();

router.post("/", cadastrarUsuario)
router.get("/", listarUsuario)
router.get("/:id", buscarUsuarioPorId)
router.patch("/:id", atualizarUsuario)
router.delete("/:id", deletarUsuario)

export default router