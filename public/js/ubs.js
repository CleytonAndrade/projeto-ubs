(function() {
  // Aplica as máscaras quando o conteúdo estiver carregado
  document.addEventListener('DOMContentLoaded', function() {
    const cpfField = document.getElementById('cpf');
    const telefoneField = document.getElementById('telefone');

    // Máscara CPF
    VMasker(cpfField).maskPattern('999.999.999-99');
    
    // Máscara Telefone
    VMasker(telefoneField).maskPattern('(99) 99999-9999');
  });

  // Seleciona o formulário
  const form = document.querySelector('#formulario form');

  // Ao enviar o formulário
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Captura os dados
    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    const especialidade = document.getElementById('especialidade').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const telefone = document.getElementById('telefone').value.replace(/\D/g, '');
    const obs = document.getElementById('obs').value.trim();

    // Validações
    if (cpf.length !== 11) {
      alert('CPF inválido. Verifique se digitou todos os números corretamente.');
      return;
    }

    if (telefone.length < 10 || telefone.length > 11) {
      alert('Telefone inválido. Verifique se digitou corretamente no formato (XX) XXXXX-XXXX.');
      return;
    }

    const formData = {
      nome,
      cpf,
      especialidade,
      data,
      hora,
      telefone,
      obs
    };

    // Envia ao servidor
    fetch('/agendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        alert('Agendamento realizado com sucesso!');
        form.reset();
      } else {
        alert('Erro ao realizar o agendamento. Tente novamente.');
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Erro de conexão. Tente novamente mais tarde.');
    });
  });
})();