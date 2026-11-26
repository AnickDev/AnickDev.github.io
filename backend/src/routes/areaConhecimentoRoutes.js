import { Router } from "express";
import { atualizarArea, cadastrarArea, deletarArea, listarArea, listarAreaPorID } from "../controllers/areaConhecimentoController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router()

router.post("/", verifyToken, cadastrarArea)
router.get("/", verifyToken, listarArea)
router.get("/:id", verifyToken, listarAreaPorID)
router.patch("/:id", verifyToken, atualizarArea)
router.delete("/:id", verifyToken, deletarArea)

export default router;