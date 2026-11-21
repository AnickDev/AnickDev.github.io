import { Router } from "express";
import { cadastrarReflexao, listarReflexoes } from "../controllers/reflexaoAnualController.js";

const router = Router()

router.post("/", cadastrarReflexao)
router.get("/", listarReflexoes)

export default router;