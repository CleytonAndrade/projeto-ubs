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

        console.log("Dados enviados:", dados);


        // Envio via fetch
        fetch("/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })
        .then(async res => {
            const texto = await res.text();
            if (!res.ok) throw new Error(texto);
            
            alert("✅ " + texto);
            document.querySelector("form").reset();
        
            // Redireciona após sucesso
            window.location.href = "/pages/login.html"; 
        })
        .catch(err => {
            alert("❌ " + err.message);
        });
               
    });
    document.addEventListener('DOMContentLoaded', function () {
        const inputSenha = document.getElementById("password");
        const btnToggle = document.getElementById("toggleSenha");
    
        if (btnToggle) {
            btnToggle.addEventListener("click", () => {
                const isHidden = inputSenha.type === "password";
                inputSenha.type = isHidden ? "text" : "password";
                btnToggle.textContent = isHidden ? "visibility_off" : "visibility";
            });
        }
    });
    
})();
