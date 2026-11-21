import { Router } from "express";
import { cadastrarMidia } from "../controllers/MidiasController.js";

const router = Router()

router.post("/", cadastrarMidia)

export default router