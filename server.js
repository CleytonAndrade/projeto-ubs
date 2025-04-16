(function () {
    require("dotenv").config();
  
    const express = require("express");
    const path = require("path");
    const mysql = require("mysql2/promise");
    const bodyParser = require("body-parser");
    const cors = require("cors");
    const bcrypt = require("bcrypt");
    const session = require("express-session");
    const csrf = require("csurf");
    const helmet = require("helmet");
  
    const app = express();
    const PORT = process.env.PORT || 3000;
  
    // Verifica se as variáveis de ambiente essenciais estão definidas
    const requiredEnv = ["DB_HOST", "DB_USER", "DB_PASS", "DB_NAME", "SESSION_SECRET"];
    const missingEnv = requiredEnv.filter(key => !process.env[key]);
    if (missingEnv.length > 0) {
      console.error("Faltam variáveis de ambiente:", missingEnv.join(", "));
      process.exit(1);
    }
  
    // Configuração do banco de dados
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  
    // Middlewares globais
    app.use(cors());
    // app.use(helmet());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, "public")));
  
    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 dia
      },
    }));

    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://unpkg.com"],
            styleSrc: ["'self'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            connectSrc: ["'self'", "https://viacep.com.br"],  // Adicionando o ViaCEP
          },
        },
      })
    );
  
    // Middleware CSRF com cookie opcional
    const csrfProtection = csrf({ cookie: false });
  
    // Middleware de autenticação
    const verificarSessao = (req, res, next) => {
      if (!req.session.usuarioId) {
        return res.status(401).send("Você precisa estar logado");
      }
      next();
    };
  
    // Rotas
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "index.html"));
    });
  
    app.get("/painel", verificarSessao, csrfProtection, (req, res) => {
      res.sendFile(path.join(__dirname, "painel.html"));
    });
  
    // Rota de cadastro
    app.post("/cadastro", async (req, res) => {
      console.log(req.body);
      const {
        nome, usuario, senha, email,
        telefone, cep, rua, numero,
        bairro, cidade, estado, nascimento,
      } = req.body;
  
      // Validações
      const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,6}$/;
      const telefoneRegex = /^\d{10,11}$/;
      const cepRegex = /^\d{8}$/;
      const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

  
      if (!nome || !usuario || !senha || !email) {
        return res.status(400).send("Campos obrigatórios não preenchidos");
      }
      if (!emailRegex.test(email)) return res.status(400).send("Email inválido");
      if (!telefoneRegex.test(telefone)) return res.status(400).send("Telefone inválido");
      if (!cepRegex.test(cep)) return res.status(400).send("CEP inválido");
      if (!senhaRegex.test(senha)) return res.status(400).send("Senha fraca");
  
      try {
        const [existe] = await pool.query("SELECT * FROM usuarios WHERE usuario = ? OR email = ?", [usuario, email]);
        if (existe.length > 0) return res.status(400).send("Usuário ou email já cadastrado");
  
        const senhaCriptografada = await bcrypt.hash(senha, 10);
  
        const sql = `
          INSERT INTO usuarios 
          (nome, usuario, senha, email, telefone, cep, rua, numero, bairro, cidade, estado, nascimento)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
        await pool.query(sql, [nome, usuario, senhaCriptografada, email, telefone, cep, rua, numero, bairro, cidade, estado, nascimento]);
        res.status(200).send("Usuário cadastrado com sucesso!");
      } catch (error) {
        console.error("Erro no cadastro:", error);
        res.status(500).send("Erro ao cadastrar usuário", + error.message);
      }
    });
  
    // Rota de login
    app.post("/login", async (req, res) => {
      const { username, password } = req.body;
  
      if (!username || !password) return res.status(400).send("Usuário ou senha não preenchidos");
  
      try {
        const [users] = await pool.query("SELECT * FROM usuarios WHERE usuario = ?", [username]);
        if (users.length === 0) return res.status(401).send("Usuário não encontrado");
  
        const user = users[0];
        const senhaConfere = await bcrypt.compare(password, user.senha);
        if (!senhaConfere) return res.status(401).send("Senha incorreta");
  
        req.session.usuarioId = user.id;
        req.session.nome = user.nome;
        req.session.usuario = user.usuario;
  
        res.redirect("/painel");
      } catch (err) {
        console.error("Erro no login:", err);
        res.status(500).send("Erro interno no login");
      }
    });
  
    // Rota de logout
    app.post("/logout", (req, res) => {
      req.session.destroy(err => {
        if (err) return res.status(500).send("Erro ao sair");
        res.send("Logout realizado com sucesso");
      });
    });
  
    // Rota de agendamento
    app.post("/agendar", async (req, res) => {
      const { nome, cpf, especialidade, data, hora, telefone, obs } = req.body;
  
      if (!nome || !cpf || !especialidade || !data || !hora || !telefone) {
        return res.status(400).send("Campos obrigatórios não preenchidos");
      }
  
      const cpfRegex = /^\d{11}$/;
      const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
      const horaRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
  
      if (!cpfRegex.test(cpf)) return res.status(400).send("CPF inválido");
      if (!dataRegex.test(data)) return res.status(400).send("Data inválida");
      if (!horaRegex.test(hora)) return res.status(400).send("Hora inválida");
  
      try {
        const sql = `
          INSERT INTO agendamentos 
          (nome, cpf, especialidade, data, hora, telefone, obs)
          VALUES (?, ?, ?, ?, ?, ?, ?)`;
        
        await pool.query(sql, [nome, cpf, especialidade, data, hora, telefone, obs]);
        res.send("Agendamento realizado com sucesso!");
      } catch (err) {
        console.error("Erro ao agendar:", err);
        res.status(500).send("Erro ao realizar agendamento");
      }
    });
  
    // Middleware global de erro
    app.use((err, req, res, next) => {
      console.error("Erro inesperado:", err);
      res.status(500).send("Erro interno do servidor");
    });
  
    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })();
  