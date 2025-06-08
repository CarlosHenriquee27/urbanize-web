// server.js - VERSÃO COMPLETA COM LOGIN E CADASTRO

// Garante que as variáveis de ambiente do .env sejam lidas primeiro
require('dotenv').config();

// 1. Importar as ferramentas
const express = require('express');
const mysql = require('mysql2/promise'); // Para conectar com MySQL
const bcrypt = require('bcryptjs');      // Para criptografar senhas
const cors = require('cors');            // Para permitir acesso do frontend

// 2. Configurar o servidor Express
const app = express();
// A porta será a definida pelo Railway ou 3000 se rodar localmente
const PORT = process.env.PORT || 3000;

// 3. Configurar os middlewares (ferramentas que o Express vai usar)
app.use(cors()); // Habilita o CORS para todas as rotas
app.use(express.json()); // Permite que o backend entenda dados em formato JSON enviados no corpo da requisição

// 4. Conectar ao Banco de Dados MySQL do Railway
// A DATABASE_URL deve estar configurada nas variáveis de ambiente do seu serviço no Railway
// E também no seu arquivo .env para testes locais
const pool = mysql.createPool(process.env.DATABASE_URL);

// Rota principal para testar se a API está no ar
app.get('/', (req, res) => {
  res.send('API do Urbanize (MySQL) está no ar e pronta para o rock! 🚀');
});

// 5. Rota de Login de Usuário
app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body; // Pega email e senha do corpo da requisição

    // Validação básica dos dados de entrada
    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    // Procura o usuário no banco de dados pelo email fornecido
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    
    // Verifica se o usuário foi encontrado
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const user = rows[0]; // Pega o primeiro usuário encontrado (deve ser único pelo email)

    // Compara a senha enviada com a senha criptografada (hash) armazenada no banco
    const isPasswordCorrect = await bcrypt.compare(senha, user.senha_hash);

    if (!isPasswordCorrect) {
      // Se a senha estiver incorreta
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    // Se o login foi bem-sucedido
    // Futuramente, aqui você pode gerar um token JWT (JSON Web Token) para autenticação
    res.status(200).json({ 
        message: 'Login bem-sucedido!', 
        userId: user.id, 
        nome: user.nome 
        // Não envie a senha_hash de volta para o frontend!
    });

  } catch (error) {
    // Tratamento de erro genérico para o servidor
    console.error('Erro no servidor durante o login:', error);
    res.status(500).json({ message: 'Erro interno no servidor ao tentar fazer login.' });
  }
});

// 6. Rota de Cadastro de Novo Usuário
app.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body; // Pega nome, email e senha do corpo da requisição

    // Validação básica dos dados de entrada
    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios para o cadastro.' });
    }

    // Verificar se o email já está cadastrado
    const [userExists] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (userExists.length > 0) {
      return res.status(409).json({ message: 'Este email já está cadastrado. Tente fazer login.' });
    }

    // Criptografar a senha antes de salvar no banco (MUITO IMPORTANTE!)
    const salt = await bcrypt.genSalt(10); // Gera um "sal" para a criptografia
    const senhaHash = await bcrypt.hash(senha, salt); // Gera o hash da senha

    // Inserir o novo usuário no banco de dados
    const [result] = await pool.query(
      'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)',
      [nome, email, senhaHash]
    );

    // Retorna uma resposta de sucesso
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', userId: result.insertId });

  } catch (error) {
    // Tratamento de erro genérico para o servidor
    console.error('Erro no servidor durante o cadastro:', error);
    res.status(500).json({ message: 'Erro interno no servidor ao tentar cadastrar usuário.' });
  }
});
// 7. Fazer o servidor "escutar" por requisições na porta definida
app.listen(PORT, () => {
  console.log(`Servidor Urbanize rodando na porta ${PORT}`);
});
