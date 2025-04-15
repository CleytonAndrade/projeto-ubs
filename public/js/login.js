(function(){
    const button = document.querySelector("#entrar");

    button.addEventListener("click", (e) => {
        e.preventDefault();
        const data = {
            name : document.querySelector("#username").value,
            password : document.querySelector("#password").value
        }
        console.log(data)
    });	
})();