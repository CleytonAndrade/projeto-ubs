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
app.post('/cadastro', async (req, res) => {
    const {
        nome, usuario, senha, email,
        telefone, cep, rua, numero,
        bairro, cidade, estado, nascimento
    } = req.body;

    // Validação de campos obrigatórios
    if (!nome || !usuario || !senha || !email) {
        return res.status(400).send('Campos obrigatórios não preenchidos');
    }

    // Validação do formato do email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send('Email inválido');
    }

    // Validação do formato do telefone
    const telefoneRegex = /^[0-9]{10,11}$/;
    if (!telefoneRegex.test(telefone)) {
        return res.status(400).send('Telefone inválido');
    }

    console.log('Dados recebidos:', req.body);

    try {
        // Verificar se o email ou usuário já existem no banco de dados
        const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE usuario = ? OR email = ?', [usuario, email]);
        if (rows.length > 0) {
            return res.status(400).send('Usuário ou email já cadastrado');
        }

        // Gerar o hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10); // 10 é o número de "salt rounds"

        const sql = `
            INSERT INTO usuarios (nome, usuario, senha, email, telefone, cep, rua, numero, bairro, cidade, estado, nascimento)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Enviar os dados para o banco de dados
        await db.promise().query(sql, [nome, usuario, hashedPassword, email, telefone, cep, rua, numero, bairro, cidade, estado, nascimento]);

        res.status(200).send('Usuário cadastrado com sucesso!');
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).send('Erro ao cadastrar usuário');
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
