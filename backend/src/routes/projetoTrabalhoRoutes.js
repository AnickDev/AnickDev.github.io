import { Router } from "express";
import { atualizarProjeto, cadastrarProjeto, listarProjeto, listarProjetoPorId } from "../controllers/projetoTrabalhoController.js";

const router = Router()

router.post("/", cadastrarProjeto)
router.get("/", listarProjeto)
router.get("/:id", listarProjetoPorId)
router.patch("/:id", atualizarProjeto)

export default router;