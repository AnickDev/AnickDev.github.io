import { Router } from "express";
import { atualizarReflexao, cadastrarReflexao, deletarReflexao, listarReflexoes, listarReflexoesPorId } from "../controllers/reflexaoAnualController.js";

const router = Router()

router.post("/", cadastrarReflexao)
router.get("/", listarReflexoes)
router.get("/:id",listarReflexoesPorId)
router.patch("/:id",atualizarReflexao)
router.delete("/:id", deletarReflexao)

export default router;