const user = document.querySelector("#username");
const pass = document.querySelector("#password");
const button = document.querySelector("#entrar");

button.addEventListener("click", (e) => {
    e.preventDefault();
    const ojectLogin = getObjectLogin(user.value, pass.value);
    const isValid = validateUser(ojectLogin.usuario, ojectLogin.senha);
});	

function getObjectLogin(user, password) {
    return {
        usuario : user,
        senha: password
    }
}

function validateUser(user, password) {
    if(!user || !password) {
        alert("Preencha todos os campos!");
        return false;
    }
    if(user.length < 3) {
        alert("O nome de usuário deve ter pelo menos 3 caracteres!");
        return false;
    }
    if(password.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres!");
        return false;
    }
    return true;    
}