import { Router } from "express";
import { cadastrarArea, listarArea, listarAreaPorID } from "../controllers/areaConhecimentoController.js";

const router = Router()

router.post("/", cadastrarArea)
router.get("/", listarArea)
router.get("/:id", listarAreaPorID)

export default router;