import { Router } from "express";
import { atualizarProjeto, cadastrarProjeto, deletarProjeto, listarProjeto, listarProjetoPorId } from "../controllers/projetoTrabalhoController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router()

router.post("/", verifyToken, cadastrarProjeto)
router.get("/", verifyToken, listarProjeto)
router.get("/:id", verifyToken, listarProjetoPorId)
router.patch("/:id", verifyToken, atualizarProjeto)
router.delete("/:id", verifyToken, deletarProjeto)

export default router;