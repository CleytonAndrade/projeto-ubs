window.onload = async function() {
    try {
        const response = await fetch("/usuario");  // Faz uma requisição para a rota /usuario
        if (!response.ok) throw new Error("Não foi possível carregar os dados do usuário.");

        const user = await response.json();
        console.log("Dados do usuário recebidos:", user);  // Verifique os dados recebidos

        // Preencher os campos com os dados do usuário
        document.getElementById("user-name").innerText = user.nome;
        document.getElementById("user-full-name").innerText = user.nome;
        document.getElementById("user-username").innerText = user.usuario;
        document.getElementById("user-senha").innerText = "********";  // Senha mascarada
        document.getElementById("user-email").innerText = user.email;
        document.getElementById("user-telefone").innerText = user.telefone;
        document.getElementById("user-endereco").innerText = `${user.rua}, ${user.numero}, ${user.bairro}, ${user.cidade}, ${user.estado}`;
        document.getElementById("user-cep").innerText = user.cep;
        document.getElementById("user-nascimento").innerText = user.nascimento;
    } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
    }
};
