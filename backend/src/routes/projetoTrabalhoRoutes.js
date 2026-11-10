import { Router } from "express";
import { cadastrarProjeto, listarProjeto } from "../controllers/projetoTrabalhoController.js";

const router = Router()

router.post("/", cadastrarProjeto)
router.get("/", listarProjeto)

export default router;