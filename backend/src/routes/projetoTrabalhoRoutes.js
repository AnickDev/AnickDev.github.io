import { Router } from "express";
import { atualizarProjeto, cadastrarProjeto, deletarProjeto, listarProjeto, listarProjetoPorId } from "../controllers/projetoTrabalhoController.js";

const router = Router()

router.post("/", cadastrarProjeto)
router.get("/", listarProjeto)
router.get("/:id", listarProjetoPorId)
router.patch("/:id", atualizarProjeto)
router.delete("/:id", deletarProjeto)

export default router;