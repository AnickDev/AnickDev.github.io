import { Router } from "express";
import { cadastrarReflexao, listarReflexoes, listarReflexoesPorId } from "../controllers/reflexaoAnualController.js";

const router = Router()

router.post("/", cadastrarReflexao)
router.get("/", listarReflexoes)
router.get("/:id",listarReflexoesPorId)

export default router;