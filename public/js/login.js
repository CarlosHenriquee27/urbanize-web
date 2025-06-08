// js/login.js

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const errorMessageElement = document.getElementById('error-message');

    const backendUrl = 'https://urbanize-web-production.up.railway.app'; 

    errorMessageElement.textContent = '';

    try {
        const response = await fetch(`${backendUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, senha: senha }),
        });

        const data = await response.json();

        if (response.ok) {
            // SUCESSO! O login funcionou.
            
            
            localStorage.setItem('urbanize_user', JSON.stringify({
                nome: data.nome,
                userId: data.userId
               
            }));
            
            // 2. Redireciona o usuário de volta para a página inicial.
            window.location.href = 'index.html'; 
            
        } else {
            errorMessageElement.textContent = data.message;
        }

    } catch (error) {
        console.error('Erro ao conectar com o backend:', error);
        errorMessageElement.textContent = 'Não foi possível conectar ao servidor.';
    }
});
