import express from 'express';
import cors from 'cors';
import { conn } from './config/db.js'; // Ajuste o caminho se sua pasta tiver outro nome

const app = express();
app.use(cors());
app.use(express.json());

// Testando a conexão com o banco ao iniciar o servidor
async function testarConexao() {
  try {
    await conn.authenticate();
    console.log(' Conexão com o MySQL (livraria3d) estabelecida com sucesso!');
  } catch (error) {
    console.error(' Erro ao conectar ao banco de dados:', error);
  }
}
testarConexao();

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
