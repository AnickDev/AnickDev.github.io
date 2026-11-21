import express from "express"
import cors from "cors"

import usuarioRoutes from "./routes/usuarioRoutes.js"
import areaConhecimentoRoutes from "./routes/areaConhecimentoRoutes.js"
import projetoTrabalhoRoutes from "./routes/projetoTrabalhoRoutes.js"
import diarioBimestralRoutes from "./routes/diarioBimestralRoutes.js"
import reflexaoAnualRoutes from "./routes/reflexaoAnualRoutes.js"

const app = express()

app.use(
    cors({
        origin:"*",
        methods:["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials:true 
    }),
);

app.use(express.json())

app.use("/usuarios", usuarioRoutes)
app.use("/area-conhecimento", areaConhecimentoRoutes)
app.use("/projeto-trabalho", projetoTrabalhoRoutes)
app.use("/diario-bimestral", diarioBimestralRoutes)
app.use("/reflexao-anual", reflexaoAnualRoutes)

app.use((request, response) => {
  response.status(404).json({ message: "Rota não encontrada" });
});

export default app;