// js/main.js

// Esta função roda assim que a página principal (index.html) termina de carregar.
document.addEventListener('DOMContentLoaded', () => {
    // Procura no "localStorage" se tem informações de usuário guardadas.
    const userDataString = localStorage.getItem('urbanize_user');

    if (userDataString) {
        // Se encontrou informações, significa que o usuário ESTÁ LOGADO.
        const userData = JSON.parse(userDataString);
        
        // Vamos atualizar a interface para mostrar "Olá, [Nome]" e o botão "Sair".
        atualizarUIParaLogado(userData.nome);
    } else {
        // Se não encontrou nada, o usuário NÃO ESTÁ LOGADO.
        atualizarUIParaDeslogado();
    }
});

function atualizarUIParaLogado(nomeUsuario) {
    // Procura o local onde o botão de Login original fica.
    const navLoginContainer = document.getElementById('nav-login-button');
    if (navLoginContainer) {
        // Esconde o botão de login e mostra o menu do usuário.
        navLoginContainer.innerHTML = `
            <div class="flex items-center text-primary-color">
                <span class="mr-4 hidden sm:inline">Olá, ${nomeUsuario}</span>
                <button id="logoutButton" class="btn-navbar px-4 py-2 rounded-md bg-red-500 bg-opacity-80 text-white hover:bg-opacity-100 text-sm font-medium">Sair</button>
            </div>
        `;

        // Adiciona a funcionalidade ao novo botão "Sair".
        document.getElementById('logoutButton').addEventListener('click', () => {
            // Limpa as informações do usuário do localStorage.
            localStorage.removeItem('urbanize_user');
            // Recarrega a página para voltar ao estado de "deslogado".
            alert('Você saiu da sua conta.');
            window.location.reload();
        });
    }

    // Muda o conteúdo da seção "Registrar Ocorrência".
    const registrarSection = document.getElementById('registrar-ocorrencia-content');
    if (registrarSection) {
        registrarSection.innerHTML = `
            <h6 class="mb-2 block text-lg font-semibold text-primary">
              Vamos lá, ${nomeUsuario}!
            </h6>
            <h2 class="mb-3">Pronto para melhorar a cidade?</h2>
            <p>
              Você está logado e já pode registrar ocorrências para ajudar a sua comunidade.
            </p>
            <a href="nova_ocorrencia.html" class="inline-block mt-6 px-7 py-3 rounded-md text-base bg-primary text-primary-color hover:bg-primary-light-10 font-medium">
                Criar Nova Ocorrência
            </a>
        `;
    }
}

function atualizarUIParaDeslogado() {
    // Garante que o botão de login original esteja visível.
    const navLoginContainer = document.getElementById('nav-login-button');
    if (navLoginContainer) {
        navLoginContainer.innerHTML = `
            <a href="login.html" class="btn-navbar ml-5 px-6 py-3 rounded-md bg-primary-color bg-opacity-20 text-base font-medium text-primary-color hover:bg-opacity-100 hover:text-primary" role="button">Login</a>
        `;
    }

    // Garante que a mensagem para fazer login esteja visível na seção de ocorrências.
    const registrarSection = document.getElementById('registrar-ocorrencia-content');
    if (registrarSection) {
        registrarSection.innerHTML = `
            <h6 class="mb-2 block text-lg font-semibold text-primary">
              Participe!
            </h6>
            <h2 class="mb-3">Registre um Problema Urbano</h2>
            <p>
              Para registrar uma ocorrência, por favor, <a href="login.html" class="text-primary font-semibold hover:underline">faça o login</a> ou <a href="cadastro.html" class="text-primary font-semibold hover:underline">crie uma conta</a>.
            </p>
        `;
    }
}
