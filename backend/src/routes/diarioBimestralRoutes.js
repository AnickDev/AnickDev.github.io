import { Router } from "express";
import { cadastrarDiario, listarDiarios } from "../controllers/diarioBimestralController.js";
import { listarArea } from "../controllers/areaConhecimentoController.js";

const router = Router()

router.post("/", cadastrarDiario)
router.get("/", listarDiarios)

export default router;