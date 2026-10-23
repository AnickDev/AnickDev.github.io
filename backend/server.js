
import "./src/models/index.js"
import app from "./src/app.js";
import { conn } from "./src/config/conn.js";

const PORT = 3333

const iniciarServidor = async () => {
    try {
        
        // await conn.sync({force: true})
        await conn.sync()

        app.listen(PORT, ()=>{
            console.log("Servidor iniciado em http://localhost:",PORT)
        })
    } catch (error) {
        console.log("Error ao inicar o servidor: ", error.message)
    }
}

await iniciarServidor()