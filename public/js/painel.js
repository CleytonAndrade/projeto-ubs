(function(){
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const response = await fetch('/api/usuario');
            if (!response.ok) {
                throw new Error('Erro ao carregar dados do usuário');
            }
    
            const usuario = await response.json();
    
            // Preencher os campos com os dados do usuário
            document.getElementById('user-name').textContent = usuario.nome;
            document.getElementById('user-full-name').textContent = usuario.nome;
            document.getElementById('user-username').textContent = usuario.usuario;
            document.getElementById('user-email').textContent = usuario.email;
            document.getElementById('user-telefone').textContent = usuario.telefone;
            document.getElementById('user-endereco').textContent = `${usuario.rua}, ${usuario.numero}, ${usuario.bairro}, ${usuario.cidade} - ${usuario.estado}`;
            document.getElementById('user-nascimento').textContent = usuario.nascimento;
    
        } catch (error) {
            console.error('Erro ao carregar os dados do painel:', error);
            alert('Erro ao carregar os dados do painel');
        }
    });
})();