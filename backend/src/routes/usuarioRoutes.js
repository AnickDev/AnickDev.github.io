import { Router } from "express";
import { atualizarUsuario, buscarUsuarioPorId, cadastrarUsuario, deletarUsuario, listarUsuario } from "../controllers/usuarioController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.post("/", cadastrarUsuario)

router.get("/", verifyToken, listarUsuario)
router.get("/:id", verifyToken, buscarUsuarioPorId)
router.patch("/:id", verifyToken, atualizarUsuario)
router.delete("/:id", verifyToken, deletarUsuario)

export default router