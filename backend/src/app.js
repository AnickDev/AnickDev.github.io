import express from "express"
import cors from "cors"

import usuarioRoutes from "./routes/usuarioRoutes.js"
import areaConhecimentoRoutes from "./routes/areaConhecimentoRoutes.js"

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

app.use((request, response) => {
  response.status(404).json({ message: "Rota não encontrada" });
});

export default app;