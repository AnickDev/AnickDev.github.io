import { Router } from "express";
import { cadastrarDiario, listarDiarioPorId, listarDiarios } from "../controllers/diarioBimestralController.js";

const router = Router()

router.post("/", cadastrarDiario)
router.get("/", listarDiarios)
router.get("/:id", listarDiarioPorId)
    
export default router;