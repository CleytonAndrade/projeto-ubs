(function(){
    require("dotenv").config();
    const express = require('express');
    const path = require('path');
    const mysql = require('mysql2');
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const bcrypt = require('bcrypt');
    const session = require('express-session');
    const csrf = require('csurf');  
    const helmet = require('helmet');  

    const app = express();
    const PORT = process.env.PORT || 3000;

    // Middleware para proteger contra CSRF
    const csrfProtection = csrf({ cookie: true });

    // Middleware
    app.use(cors());
    app.use(helmet());  
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'public')));

    // Configuração da sessão
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { 
            secure: process.env.NODE_ENV === 'production', 
            httpOnly: true, 
            maxAge: 24 * 60 * 60 * 1000 
        }
    }));

    // Middleware para verificar se o usuário está logado
    function verificarSessao(req, res, next) {
        if (!req.session.usuarioId) {
            return res.status(401).send('Você precisa estar logado para acessar esta página');
        }
        next();
    }

    // Usando o middleware para proteger a rota do painel
    app.get('/painel', verificarSessao, csrfProtection, (req, res) => {
        res.sendFile(path.join(__dirname, 'painel.html'));
    });

    // Rota principal para o index.html
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    // Verificação de variáveis de ambiente
    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASS || !process.env.DB_NAME || !process.env.SESSION_SECRET) {
        console.error('Faltam variáveis de ambiente obrigatórias!');
        process.exit(1); 
    }

    // Conexão com o banco de dados (usando Pool para maior eficiência)
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Erro ao conectar:', err.message);
            return;
        }
        console.log('Conectado com sucesso ao MySQL remoto!');
        connection.release();
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
        const telefoneRegex = /^(?:\(\d{2}\)\s?)?\d{4,5}-\d{4}$/;
        if (!telefoneRegex.test(telefone)) {
            return res.status(400).send('Telefone inválido. Formato esperado: (XX) XXXXX-XXXX');
        }

        // Validação do formato do CEP
        const cepRegex = /^\d{5}-\d{3}$/;
        if (!cepRegex.test(cep)) {
            return res.status(400).send('CEP inválido. Formato esperado: XXXXX-XXX');
        }

        // Validação de senha (mínimo 8 caracteres, número e caractere especial)
        const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!senhaRegex.test(senha)) {
            return res.status(400).send('Senha deve ter pelo menos 8 caracteres, um número e um caractere especial');
        }

        try {
            // Verificar se o email ou usuário já existem no banco de dados
            const [rows] = await pool.promise().query('SELECT * FROM usuarios WHERE usuario = ? OR email = ?', [usuario, email]);
            if (rows.length > 0) {
                return res.status(400).send('Usuário ou email já cadastrado');
            }

            // Gerar o hash da senha
            const hashedPassword = await bcrypt.hash(senha, 10); 

            const sql = `
                INSERT INTO usuarios (nome, usuario, senha, email, telefone, cep, rua, numero, bairro, cidade, estado, nascimento)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            // Enviar os dados para o banco de dados
            await pool.promise().query(sql, [nome, usuario, hashedPassword, email, telefone, cep, rua, numero, bairro, cidade, estado, nascimento]);

            res.status(200).send('Usuário cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).send('Erro ao cadastrar usuário');
        }
    });

    // Rota para login
    app.post('/login', async (req, res) => {
        const { username, password } = req.body;

        // Verifica se os campos estão preenchidos
        if (!username || !password) {
            return res.status(400).send("Usuário ou senha não preenchidos");
        }

        try {
            // Buscar usuário no banco de dados
            const [rows] = await pool.promise().query('SELECT * FROM usuarios WHERE usuario = ?', [username]);

            if (rows.length === 0) {
                return res.status(401).send('Usuário não encontrado');
            }

            const usuario = rows[0]; 

            // Comparar senha fornecida com a senha hash no banco
            const senhaValida = await bcrypt.compare(password, usuario.senha);
            
            if (!senhaValida) {
                return res.status(401).send('Senha incorreta');
            }

            // Login bem-sucedido, armazenando a sessão
            req.session.usuarioId = usuario.id;
            req.session.nome = usuario.nome;
            req.session.usuario = usuario.usuario;

            res.status(200).redirect('/painel'); // Redirecionar para o painel após login
        } catch (error) {
            console.error('Erro no login:', error);
            res.status(500).send('Erro no servidor durante o login');
        }
    });

    // Rota de logout
    app.post('/logout', (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Erro ao encerrar sessão');
            }
            res.status(200).send('Sessão encerrada com sucesso');
        });
    });

    // Rota para agendamento de consulta
    app.post('/agendar', async (req, res) => {
    const { nome, cpf, especialidade, data, hora, telefone, obs } = req.body;
  
    // Validação dos campos
    if (!nome || !cpf || !especialidade || !data || !hora || !telefone) {
      return res.status(400).send('Campos obrigatórios não preenchidos');
    }
  
    // Validação do CPF (pode ser feito com regex ou uma biblioteca)
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
      return res.status(400).send('CPF inválido');
    }
  
    // Validação do formato da data (pode ser no formato YYYY-MM-DD)
    const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dataRegex.test(data)) {
      return res.status(400).send('Data inválida');
    }
  
    // Validação do formato da hora (HH:MM)
    const horaRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
    if (!horaRegex.test(hora)) {
      return res.status(400).send('Hora inválida');
    }
  
    try {
      // Inserir dados de agendamento no banco de dados
      const sql = `
        INSERT INTO agendamentos (nome, cpf, especialidade, data, hora, telefone, obs)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      await pool.promise().query(sql, [nome, cpf, especialidade, data, hora, telefone, obs]);
  
      // Responder com sucesso
      res.status(200).send('Agendamento realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao agendar:', error);
      res.status(500).send('Erro ao realizar agendamento');
    }
  });
  

    // Middleware global para captura de erros
    app.use((err, req, res, next) => {
        console.error('Erro inesperado:', err);
        res.status(500).send('Erro interno do servidor');
    });

    // Iniciar servidor
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });

})();
