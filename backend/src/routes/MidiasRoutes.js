import { Router } from "express";
import { atualizarMidia, cadastrarMidia, deletarMidia, listarMidiaPorId, listarMidias } from "../controllers/MidiasController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router()

router.post("/", verifyToken, cadastrarMidia)
router.get("/", verifyToken, listarMidias)
router.get("/:id", verifyToken, listarMidiaPorId)
router.patch("/:id", verifyToken, atualizarMidia)
router.delete("/:id", verifyToken, deletarMidia)

export default router 