import { Router } from "express";
import { cadastrarArea, listarArea } from "../controllers/areaConhecimentoController.js";

const router = Router()

router.post("/", cadastrarArea)
router.get("/", listarArea)

export default router;