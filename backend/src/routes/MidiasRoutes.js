import { Router } from "express";
import { atualizarMidia, cadastrarMidia, deletarMidia, listarMidiaPorId, listarMidias } from "../controllers/MidiasController.js";

const router = Router()

router.post("/", cadastrarMidia)
router.get("/", listarMidias)
router.get("/:id", listarMidiaPorId)
router.patch("/:id", atualizarMidia)
router.delete("/:id", deletarMidia)

export default router