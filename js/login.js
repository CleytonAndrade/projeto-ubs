const user = document.querySelector("#username");
const pass = document.querySelector("#password");
const button = document.querySelector("#entrar");

button.addEventListener("click", (e) => {
    e.preventDefault();
    const ojectLogin = getObjectLogin(user.value, pass.value);
    console.log(ojectLogin)
});	

function getObjectLogin(user, password) {
    return {
        usuario : user,
        senha: password
    }
}

