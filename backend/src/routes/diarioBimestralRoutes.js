import { Router } from "express";
import { atualizarDiario, cadastrarDiario, deletarDiario, listarDiarioPorId, listarDiarios } from "../controllers/diarioBimestralController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router()

router.post("/", verifyToken, cadastrarDiario)
router.get("/", verifyToken, listarDiarios)
router.get("/:id", verifyToken, listarDiarioPorId)
router.patch("/:id", verifyToken, atualizarDiario)
router.delete("/:id", verifyToken, deletarDiario)

export default router;