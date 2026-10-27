import { Router } from "express";
import { cadastrarArea } from "../controllers/areaConhecimentoController.js";

const router = Router()

router.post("/", cadastrarArea)

export default router;