import { Router } from "express";
import { cadastrarReflexao } from "../controllers/reflexaoAnualController.js";

const router = Router()

router.post("/", cadastrarReflexao)

export default router;