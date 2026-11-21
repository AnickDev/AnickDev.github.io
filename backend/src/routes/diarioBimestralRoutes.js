import { Router } from "express";
import { atualizarDiario, cadastrarDiario, listarDiarioPorId, listarDiarios } from "../controllers/diarioBimestralController.js";

const router = Router()

router.post("/", cadastrarDiario)
router.get("/", listarDiarios)
router.get("/:id", listarDiarioPorId)
router.patch("/:id", atualizarDiario)

export default router;