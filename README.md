Projeto Urbanize - Plataforma de Monitoramento Urbano

## 1. Visão Geral do Projeto

Aplicação web para comunicação entre cidadãos e gestão pública sobre problemas de infraestrutura urbana. O sistema conta com autenticação de usuários para o registro de ocorrências.

Links do Projeto:
Repositório do Código: [https://github.com/CarlosHenriquee27/urbanize-web](https://github.com/CarlosHenriquee27/urbanize-web)
Frontend (Site Online): [https://urbanize-web.vercel.app/](https://urbanize-web.vercel.app/)
Backend (API Online): [https://urbanize-web-production.up.railway.app/](https://urbanize-web-production.up.railway.app/)

---

## 2. Funcionalidades Principais

Sistema de Usuários: Cadastro seguro com senhas criptografadas, login e gerenciamento de sessão no frontend via `localStorage`.
Registro de Ocorrências: Formulário para usuários logados registrarem problemas, associando a ocorrência ao seu ID.

---

## 3. Tecnologias Utilizadas

Frontend: HTML5, CSS3, JavaScript (ES6+), API Fetch. Hospedado na Vercel.
Backend: Node.js, Express.js, `mysql2`, `bcryptjs`, `cors`, `dotenv`. Hospedado no Railway.
Banco de Dados: MySQL. Hospedado no Railway.

---


## 5. Endpoints da API

`POST /cadastro`
    Recebe: `{ "nome", "email", "senha" }`
    Função: Cria um novo usuário.

`POST /login`
    Recebe: `{ "email", "senha" }`
    Função: Autentica um usuário.

`POST /ocorrencias`
    Recebe: `{ "tipo", "descricao", "localizacao", "usuario_id" }`
    Função: Salva uma nova ocorrência.

---

## 6. Como Rodar o Projeto Localmente

1.  Clone o Repositório:
    ```bash
    git clone [https://github.com/CarlosHenriquee27/urbanize-web.git](https://github.com/CarlosHenriquee27/urbanize-web.git)
    cd urbanize-web
    ```

2.  Instale as Dependências:
    ```bash
    npm install
    ```

3.  Configure o `.env`:
    Crie um arquivo `.env` na raiz.
    Adicione a linha: `DATABASE_URL="mysql://root:SUA_SENHA@SEU_HOST:PORTA/railway"`

4.  Inicie o Servidor:
    ```bash
    node server.js
    ```

5.  Abra o Frontend:
    Abra um dos arquivos HTML da pasta `public` no seu navegador.
    Para testes locais, a `backendUrl` nos arquivos `.js` deve ser `http://localhost:3000`.

---
Projeto Programação Web e Projeto Integrador