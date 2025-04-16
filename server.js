require("dotenv").config();
const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal para o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar:', err.message);
        return;
    }
    console.log('Conectado com sucesso ao MySQL remoto!');
});

// Rota para cadastro
app.post('/cadastro', (req, res) => {
    const {
        nome, usuario, senha, email,
        telefone, cep, rua, numero,
        bairro, cidade, estado, nascimento
    } = req.body;

    // Validação de campos obrigatórios antes da execução da query
    if (!nome || !usuario || !senha || !email) {
        return res.status(400).send('Campos obrigatórios não preenchidos');
    }

    console.log('Dados recebidos:', req.body);

    // Gerar o hash da senha
    const hashedPassword = bcrypt.hashSync(senha, 10); // 10 é o número de "salt rounds"

    const sql = `
        INSERT INTO usuarios (nome, usuario, senha, email, telefone, cep, rua, numero, bairro, cidade, estado, nascimento)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Envio da query para o banco de dados
    db.query(sql, [nome, usuario, hashedPassword, email, telefone, cep, rua, numero, bairro, cidade, estado, nascimento], (err, result) => {
        if (err) {
            console.error('Erro ao executar a query:', err);
            return res.status(500).send('Erro ao cadastrar usuário');
        }

        res.status(200).send('Usuário cadastrado com sucesso!');
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
