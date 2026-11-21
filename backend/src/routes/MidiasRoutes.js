import { Router } from "express";
import { cadastrarMidia, listarMidiaPorId, listarMidias } from "../controllers/MidiasController.js";

const router = Router()

router.post("/", cadastrarMidia)
router.get("/", listarMidias)
router.get("/:id", listarMidiaPorId)

export default router