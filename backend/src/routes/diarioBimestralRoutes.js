import { Router } from "express";
import { cadastrarDiario } from "../controllers/diarioBimestralController.js";

const router = Router()

router.post("/", cadastrarDiario)

export default router;