(function() {
  // Seleciona o formulário de agendamento
  const form = document.querySelector('#formulario form');
  
  // Aplica as máscaras nos campos de CPF e Telefone
  document.addEventListener('DOMContentLoaded', function() {
    const cpfField = document.getElementById('cpf');
    const telefoneField = document.getElementById('telefone');

    // Aplica a máscara de CPF
    VMasker(cpfField).maskPattern('999.999.999-99');

    // Aplica a máscara de telefone
    VMasker(telefoneField).maskPattern('(99) 99999-9999');
  });
  
  // Função que será executada ao submeter o formulário
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os dados dos campos do formulário
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const especialidade = document.getElementById('especialidade').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const telefone = document.getElementById('telefone').value;
    const obs = document.getElementById('obs').value;

    // Expressões regulares para validação
    const cpfRegex = /^\d{11}$/;
    const telefoneRegex = /^(?:\(\d{2}\)\s?)?\d{4,5}-\d{4}$/;

    // Validação do CPF
    if (!cpfRegex.test(cpf)) {
      alert('CPF inválido. O formato esperado é 123.456.789-01');
      return;
    }

    // Validação do telefone
    if (!telefoneRegex.test(telefone)) {
      alert('Telefone inválido. O formato esperado é (XX) XXXXX-XXXX');
      return;
    }

    // Cria um objeto com os dados para enviar
    const formData = {
      nome,
      cpf,
      especialidade,
      data,
      hora,
      telefone,
      obs
    };

    // Envia os dados para o servidor via Fetch API
    fetch('/agendar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        // Caso o agendamento seja bem-sucedido
        alert('Agendamento realizado com sucesso!');
        form.reset(); // Limpa os campos do formulário
      } else {
        // Se ocorrer um erro no backend
        alert('Erro ao realizar o agendamento. Tente novamente.');
      }
    })
    .catch(error => {
      // Caso ocorra um erro ao tentar se conectar ao servidor
      console.error('Erro:', error);
      alert('Erro de conexão. Tente novamente mais tarde.');
    });
  });

})();
