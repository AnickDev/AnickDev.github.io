import express from 'express';
import cors from 'cors';
import { conn } from './config/conn.js'; 

const app = express();
app.use(cors());
app.use(express.json());

async function testarConexao() {
  try {
    await conn.authenticate();
    console.log(' Conexão com o MySQL estabelecida com sucesso!');
  } catch (error) {
    console.error(' Erro ao conectar ao banco de dados:', error);
  }
}
testarConexao();

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
