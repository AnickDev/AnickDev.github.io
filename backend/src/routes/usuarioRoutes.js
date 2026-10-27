import { Router } from "express";
import { buscarUsuarioPorId, cadastrarUsuario, listarUsuario } from "../controllers/usuarioController.js";

const router = Router();

router.post("/", cadastrarUsuario)
router.get("/", listarUsuario)
router.get("/:id", buscarUsuarioPorId)

export default router