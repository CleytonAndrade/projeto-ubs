(function () {
    require("dotenv").config();

    const express = require("express");
    const path = require("path");
    const mysql = require("mysql2/promise");
    const cors = require("cors");
    const bcrypt = require("bcrypt");
    const session = require("express-session");
    const app = express();
    const PORT = process.env.PORT || 3000;

    // Verifica se as variáveis de ambiente essenciais estão definidas
    const requiredEnv = [
        "DB_HOST",
        "DB_USER",
        "DB_PASS",
        "DB_NAME",
        "SESSION_SECRET",
    ];
    const missingEnv = requiredEnv.filter((key) => !process.env[key]);
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
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, "public")));

    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000, // 1 dia
            },
        })
    );

    // Rotas
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "index.html"));
    });

    // Rota de cadastro
    app.post("/cadastro", async (req, res) => {
        console.log(req.body);
        const {
            nome,
            usuario,
            senha,
            email,
            telefone,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado,
            nascimento,
        } = req.body;

        // Validações
        const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,6}$/;
        const telefoneRegex = /^\d{10,11}$/;
        const cepRegex = /^\d{8}$/;
        const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

        if (!nome || !usuario || !senha || !email) {
            return res.status(400).send("Campos obrigatórios não preenchidos");
        }
        if (!emailRegex.test(email))
            return res.status(400).send("Email inválido");
        if (!telefoneRegex.test(telefone))
            return res.status(400).send("Telefone inválido");
        if (!cepRegex.test(cep)) return res.status(400).send("CEP inválido");
        if (!senhaRegex.test(senha)) return res.status(400).send("Senha fraca");

        try {
            const [existe] = await pool.query(
                "SELECT * FROM usuarios WHERE usuario = ? OR email = ?",
                [usuario, email]
            );
            if (existe.length > 0)
                return res.status(400).send("Usuário ou email já cadastrado");

            const senhaCriptografada = await bcrypt.hash(senha, 10);

            const sql = `
        INSERT INTO usuarios 
        (nome, usuario, senha, email, telefone, cep, rua, numero, bairro, cidade, estado, nascimento)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            await pool.query(sql, [
                nome,
                usuario,
                senhaCriptografada,
                email,
                telefone,
                cep,
                rua,
                numero,
                bairro,
                cidade,
                estado,
                nascimento,
            ]);
            res.status(200).send("Usuário cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro no cadastro:", error);
            res.status(500).send("Erro ao cadastrar usuário", +error.message);
        }
    });

    // Rota de login
    app.get("/login", (req, res) => {
        res.sendFile(__dirname + "/public/pages/login.html");
    });

    app.post("/login", async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Por favor, preencha todos os campos." });
        }

        try {
            const [users] = await pool.query(
                "SELECT * FROM usuarios WHERE usuario = ?",
                [username]
            );
            if (users.length === 0) {
                return res
                    .status(401)
                    .json({ message: "Usuário não encontrado." });
            }

            const user = users[0];
            const senhaConfere = await bcrypt.compare(password, user.senha);

            if (!senhaConfere) {
                return res.status(401).json({ message: "Senha incorreta." });
            }

            // Armazena o nome e outras informações do usuário na sessão
            req.session.usuarioId = user.id;
            req.session.nome = user.nome;
            req.session.usuario = user.usuario;

            // Responde com o nome do usuário e a URL de redirecionamento
            res.json({
                message: "Login bem-sucedido",
                redirectUrl: "/", // A URL para redirecionamento após login
                nome: user.nome,
            });
        } catch (err) {
            console.error("Erro no login:", err);
            res.status(500).json({ message: "Erro interno no login" });
        }
    });

    // Rota de logout
    app.get("/logout", (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error("Erro ao encerrar a sessão:", err);
                return res.status(500).send("Erro ao encerrar a sessão");
            }
            res.redirect("/"); // Redireciona para a página inicial após o logout
        });
    });

    // Rota para página de recuperação de senha
    app.get("/recuperar-senha", (req, res) => {
        res.sendFile(path.join(__dirname, "public/pages/recuperar-senha.html"));
    });

    // Rota de agendamento
    app.post("/agendar", (req, res) => {
        const { nome, cpf, especialidade, data, hora, telefone, obs } =
            req.body;

        const sql = `
        INSERT INTO agendamentos (nome, cpf, especialidade, data, hora, telefone, obs)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

        db.query(
            sql,
            [nome, cpf, especialidade, data, hora, telefone, obs],
            (err, result) => {
                if (err) {
                    console.error("Erro ao salvar agendamento:", err);
                    return res
                        .status(500)
                        .send("Erro ao agendar. Tente novamente mais tarde.");
                }

                // Redireciona de volta para a página ou mostra confirmação
                res.send(`
                <h2>Agendamento realizado com sucesso!</h2>
                <p><a href="/pages/ubs.html">Voltar para a página da UBS</a></p>
            `);
            }
        );
    });

    // Recuperação se senha
    app.post("/enviar-recuperacao", (req, res) => {
        const email = req.body.email;

        if (!email) {
            return res.status(400).send("E-mail não fornecido.");
        }

        const query = "SELECT * FROM usuarios WHERE email = ?";
        db.query(query, [email], (err, results) => {
            if (err) {
                console.error("Erro ao buscar e-mail:", err);
                return res.status(500).send("Erro interno do servidor.");
            }

            if (results.length === 0) {
                return res.status(404).send("E-mail não encontrado.");
            }

            // Aqui você pode gerar um token e enviar o link por e-mail
            console.log(`Enviar link de recuperação para: ${email}`);

            res.send(`
            <h2>Verifique seu e-mail</h2>
            <p>Se o e-mail <strong>${email}</strong> estiver cadastrado, você receberá um link para redefinir sua senha.</p>
            <a href="/">Voltar à página inicial</a>
        `);
        });
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
