(function() {
    const button = document.querySelector("#cadastrar");
    button.addEventListener("click", (e) => {
        e.preventDefault();
        
        // Coleta os dados do formulário
        const dados = {
            nome: document.querySelector("#name").value,
            usuario: document.querySelector("#username").value,
            senha: document.querySelector("#password").value,
            email: document.querySelector("#email").value,
            telefone: document.querySelector("#tel").value,
            cep: document.querySelector("#cep").value,
            rua: document.querySelector("#rua").value,
            numero: document.querySelector("#number").value,
            bairro: document.querySelector("#bairro").value,
            cidade: document.querySelector("#cidade").value,
            estado: document.querySelector("#estado").value,
            nascimento: document.querySelector("#nasc").value
        };

        // Validação de campos obrigatórios
        if (!dados.nome || !dados.usuario || !dados.senha || !dados.email || !dados.telefone) {
            alert("❌ Todos os campos obrigatórios devem ser preenchidos!");
            return;
        }

        // Validação de email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(dados.email)) {
            alert("❌ Email inválido!");
            return;
        }

        // Validação de senha
        if (dados.senha.length < 6) {
            alert("❌ A senha deve ter pelo menos 6 caracteres!");
            return;
        }

        // Validar telefone (apenas um exemplo de formato)
        const telefoneRegex = /^[0-9]{10,11}$/;
        if (!telefoneRegex.test(dados.telefone)) {
            alert("❌ O telefone deve conter apenas números e ter 10 ou 11 dígitos!");
            return;
        }

        // Envia os dados para o backend via fetch
        fetch("/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (!response.ok) throw new Error("Erro no cadastro");
            return response.text();
        })
        .then(data => {
            alert("✅ " + data);
            document.querySelector("form").reset();
        })
        .catch(error => {
            alert("❌ Ocorreu um erro: " + error.message);
            console.error("Detalhes do erro:", error);
        });
    });
})();
