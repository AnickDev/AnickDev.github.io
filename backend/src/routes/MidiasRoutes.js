import { Router } from "express";
import { cadastrarMidia, listarMidias } from "../controllers/MidiasController.js";

const router = Router()

router.post("/", cadastrarMidia)
router.get("/", listarMidias)

export default router