require("dotenv").config();
const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao MySQL');
});

// Rota para cadastro
app.post('/cadastro', (req, res) => {
    const {
        nome, usuario, senha, email,
        telefone, cep, rua, numero,
        bairro, cidade, estado, nascimento
    } = req.body;

    const sql = `
        INSERT INTO usuarios (nome, usuario, senha, email, telefone, cep, rua, numero, bairro, cidade, estado, nascimento)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [nome, usuario, senha, email, telefone, cep, rua, numero, bairro, cidade, estado, nascimento], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao cadastrar usuário');
            return;
        }
        res.status(200).send('Usuário cadastrado com sucesso!');
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
