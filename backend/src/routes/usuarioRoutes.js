import { Router } from "express";
import { cadastrarUsuario, listarUsuario } from "../controllers/usuarioController.js";

const router = Router();

router.post("/", cadastrarUsuario)
router.get("/", listarUsuario)

export default router