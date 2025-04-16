(function () {
    // Aplica a máscara de telefone e cep
    const telInput = document.querySelector("#tel");
    const cepInput = document.querySelector("#cep");

    VMasker(telInput).maskPattern("(99) 99999-9999");
    VMasker(cepInput).maskPattern("99999-999");

    // Auto preenchimento de endereço via ViaCEP
    cepInput.addEventListener("blur", () => {
        const cep = cepInput.value.replace(/\D/g, "");

        if (cep.length !== 8) return;

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
            .then(data => {
                if (data.erro) {
                    alert("❌ CEP não encontrado.");
                    return;
                }

                document.querySelector("#rua").value = data.logradouro;
                document.querySelector("#bairro").value = data.bairro;
                document.querySelector("#cidade").value = data.localidade;
                document.querySelector("#estado").value = data.uf;
            })
            .catch((err) => {
                alert("❌ Erro ao buscar o CEP.");
            });
    });

    // Validação e envio do formulário
    const button = document.querySelector("#cadastrar");
    button.addEventListener("click", (e) => {
        e.preventDefault();

        const dados = {
            nome: document.querySelector("#name").value,            
            usuario: document.querySelector("#username").value,     
            senha: document.querySelector("#password").value,       
            email: document.querySelector("#email").value,        
            telefone: telInput.value.replace(/\D/g, ""),            
            cep: cepInput.value.replace(/\D/g, ""),                 
            rua: document.querySelector("#rua").value,              
            numero: document.querySelector("#number").value,       
            bairro: document.querySelector("#bairro").value,        
            cidade: document.querySelector("#cidade").value,        
            estado: document.querySelector("#estado").value,        
            nascimento: document.querySelector("#nasc").value      
        };
        

        // Validações básicas
        if (!dados.nome || !dados.usuario || !dados.senha || !dados.email || !dados.telefone) {
            alert("❌ Todos os campos obrigatórios devem ser preenchidos!");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(dados.email)) {
            alert("❌ Email inválido!");
            return;
        }

        if (dados.senha.length < 6) {
            alert("❌ A senha deve ter pelo menos 6 caracteres!");
            return;
        }

        if (!/^\d{10,11}$/.test(dados.telefone)) {
            alert("❌ O telefone deve conter apenas números (10 ou 11 dígitos)!");
            return;
        }

        // Envio via fetch
        fetch("/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })
        .then(res => {
            if (!res.ok) throw new Error("Erro no cadastro");
            return res.text();
        })
        .then(msg => {
            alert("✅ " + msg);
            document.querySelector("form").reset();
        })
        .catch(err => {
            alert("❌ Ocorreu um erro: " + err.message);
        });
    });
})();
