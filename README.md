# 💻 EWZ Challenge - Projeto feito para estágio em programação back-end

## 🚀 Tecnologias Usadas
- NodeJS
- MongoDB
- TypeScript

## 🧐 Desafios Enfrentados
- Integrar com a API sem prévia descrição

## 📚 Aprendizados
- Pesquisar nas documentações

## O que é e como usar?

O projeto consiste em integrar com a API do Pipedrive para fazer o gerenciamento das Oportunidades(Deals) e Ganhos

Para começar, existem os EndPoints de Registro e Login do Usuário, na rota de registro o usuário fornecerá o TOKEN da API do Pipedrive juntamente com seu email e senha.

Após feito o login, ele tera acesso a rotas das Deals

### All Deals Route

Nessa rota o usuário poderá ver todas as deals que ele já fez, quando ele entrar nessa rota a API chama o banco de dados e faz uma sincronização, fazendo que todas as Deals fiquem salvas no banco!

### Won Deals Route

Na rota Won Deals o usuário poderá ver as Deals que estiverem com status won(ganho)

### Search by day Route

Nessa rota o usuário passará como parâmetro na URL um dia, a API era buscar no banco de dados todas as Deals feitas naquele dia!

## Instalação

```terminal
$ git clone https://github.com/Snitrxm/EWZChallenge.git

$ cd EWZChallenge

$ npm run dev
```


