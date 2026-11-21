import { Router } from "express";
import { atualizarReflexao, cadastrarReflexao, listarReflexoes, listarReflexoesPorId } from "../controllers/reflexaoAnualController.js";

const router = Router()

router.post("/", cadastrarReflexao)
router.get("/", listarReflexoes)
router.get("/:id",listarReflexoesPorId)
router.patch("/:id",atualizarReflexao)

export default router;