// js/ocorrencia.js

// Verifica o login assim que a página carrega
document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('urbanize_user');
    if (!user) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html';
    }
});

// Referências para os elementos do formulário de upload
const fileInput = document.getElementById('foto');
const fileNameDisplay = document.getElementById('file-name-display');
const imagePreview = document.getElementById('image-preview');

// Adiciona um evento para quando um arquivo for selecionado
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
        // Mostra o nome do arquivo selecionado
        fileNameDisplay.textContent = file.name;

        // Cria um leitor de arquivos para mostrar a pré-visualização
        const reader = new FileReader();
        reader.onload = function(e) {
            // Mostra a imagem e define a fonte
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});

// Adiciona o evento de envio ao formulário
document.getElementById('occurrenceForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const successMessageElement = document.getElementById('success-message');
    successMessageElement.textContent = '';

    // Pega os dados do usuário do localStorage
    const userData = JSON.parse(localStorage.getItem('urbanize_user'));
    if (!userData || !userData.userId) {
        alert('Erro de sessão. Por favor, faça o login novamente.');
        return;
    }

    // Pega os dados do formulário
    const tipo = document.getElementById('tipo').value;
    const localizacao = document.getElementById('localizacao').value;
    const descricao = document.getElementById('descricao').value;
    
    const dadosDaOcorrencia = {
        tipo,
        localizacao,
        descricao,
        usuario_id: userData.userId
    };

    const backendUrl = 'https://urbanize-web-production.up.railway.app';

    try {
        const response = await fetch(`${backendUrl}/ocorrencias`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosDaOcorrencia)
        });

        const result = await response.json();

        if (response.ok) {
            successMessageElement.textContent = 'Ocorrência enviada com sucesso! Redirecionando...';
            
            // Espera 2 segundos antes de redirecionar para a página inicial
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);

        } else {
            alert('Erro ao registrar ocorrência: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao enviar ocorrência:', error);
        alert('Não foi possível conectar ao servidor.');
    }
});
