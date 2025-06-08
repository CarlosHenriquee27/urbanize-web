document.getElementById('cadastroForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o recarregamento da página

    // Pega os valores dos campos do formulário de cadastro.
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;
    const errorMessageElement = document.getElementById('error-message');

    // Limpa qualquer mensagem de erro anterior.
    errorMessageElement.textContent = '';

    // Verifica se as senhas digitadas são iguais.
    if (senha !== confirmaSenha) {
        errorMessageElement.textContent = 'As senhas não coincidem!';
        return; // Interrompe a execução se as senhas forem diferentes.
    }

    const backendUrl = 'https://urbanize-web-production.up.railway.app'; 

    try {
        // Envia uma requisição 'POST' para o caminho '/cadastro' no nosso backendUrl.
        const response = await fetch(`${backendUrl}/cadastro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Envia nome, email e senha no formato JSON.
            body: JSON.stringify({ nome, email, senha }),
        });

        const data = await response.json(); // Converte a resposta do backend.

        if (response.ok) { // Se o cadastro foi bem-sucedido no backend.
            alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
            // Redireciona o usuário para a página de login (index.html, se for sua página de login).
            window.location.href = 'login.html'; 
        } else {
            // Se o backend respondeu com um erro (ex: email já cadastrado).
            errorMessageElement.textContent = data.message || `Erro ${response.status}. Tente novamente.`;
        }

    } catch (error) {
        // Se houve um erro de rede.
        console.error('Erro ao conectar com o backend:', error);
        errorMessageElement.textContent = 'Não foi possível conectar ao servidor. Verifique sua internet e se o backend está no ar.';
    }
});
