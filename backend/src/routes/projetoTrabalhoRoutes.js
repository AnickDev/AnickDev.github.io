import { Router } from "express";
import { cadastrarProjeto, listarProjeto, listarProjetoPorId } from "../controllers/projetoTrabalhoController.js";

const router = Router()

router.post("/", cadastrarProjeto)
router.get("/", listarProjeto)
router.get("/:id", listarProjetoPorId)

export default router;