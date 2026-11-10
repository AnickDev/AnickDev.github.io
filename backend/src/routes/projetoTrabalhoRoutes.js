import { Router } from "express";
import { cadastrarProjeto } from "../controllers/projetoTrabalhoController.js";

const router = Router()

router.post("/", cadastrarProjeto)

export default router;