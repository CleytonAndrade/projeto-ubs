# 🏥 Portal Saúde - Capelinha - MG

## 📌 Objetivo do Portal Saúde

Portal Saúde tem como objetivo facilitar o acesso da população às informações sobre os postos de saúde (UBS) do município de **Capelinha - MG**.

Aqui, o cidadão pode:

- 📍 Conhecer a **localização** e os **serviços oferecidos** por cada unidade.
- 🩺 Acessar **dicas de prevenção de doenças** e **hábitos saudáveis**.
- 📰 Ficar por dentro de **notícias relacionadas à saúde pública**.

Nosso compromisso é **promover informação clara, acessível e útil para todos**.

## 🌐 Acesse o sistema

👉 [Clique aqui para acessar o Portal Saúde](https://projeto-ubs.onrender.com)

---

## 🚀 Tecnologias Utilizadas

- **Node.js** + **Express**
- **MySQL**
- **HTML5, CSS3 e JavaScript**
- **Helmet** (Content Security Policy)
- **bcrypt**, **dotenv**, **express-session**
- **ViaCEP API** (consultas de endereço por CEP)

## 🛡️ Segurança

O sistema está protegido com:

- Política de segurança de conteúdo (CSP) via Helmet
- Proteção contra CSRF
- Hash de senhas com bcrypt
- Sessões seguras com express-session

## 🛠️ Estrutura do Projeto

```bash
├── public/
│   ├── assets/
│   ├── css/
│   ├── js/
│   └── pages/
├── server.js
├── .env
├── package.json
└── README.md
