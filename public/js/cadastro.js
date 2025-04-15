(function() {
    const button = document.querySelector("#cadastrar");
    button.addEventListener("click", (e) => {
        e.preventDefault();
        const dados = {
            nome: document.querySelector("#name").value,
            usuario: document.querySelector("#user").value,
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
        
    });

    

}) ();

