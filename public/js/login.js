(function(){
    const button = document.querySelector("#entrar");

    button.addEventListener("click", (e) => {
        const username = document.querySelector("#username").value.trim();
        const password = document.querySelector("#password").value.trim();

        if (!username || !password) {
            e.preventDefault(); 
            alert("Por favor, preencha todos os campos.");
        }
        
    });	
})();