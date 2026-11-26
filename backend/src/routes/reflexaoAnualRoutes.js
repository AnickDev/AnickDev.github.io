import { Router } from "express";
import { atualizarReflexao, cadastrarReflexao, deletarReflexao, listarReflexoes, listarReflexoesPorId } from "../controllers/reflexaoAnualController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router()

router.post("/", verifyToken, cadastrarReflexao)
router.get("/", verifyToken, listarReflexoes)
router.get("/:id", verifyToken, listarReflexoesPorId)
router.patch("/:id", verifyToken, atualizarReflexao)
router.delete("/:id", verifyToken, deletarReflexao)

export default router;