import { Router } from "express";
import { atualizarArea, cadastrarArea, listarArea, listarAreaPorID } from "../controllers/areaConhecimentoController.js";

const router = Router()

router.post("/", cadastrarArea)
router.get("/", listarArea)
router.get("/:id", listarAreaPorID)
router.patch("/:id", atualizarArea)

export default router;