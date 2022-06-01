# EWZ Challenge - Projeto feito para estagio em programaçao back-end

## 🚀 Tecnologias Usadas
- NodeJS
- MongoDB
- TypeScript

## 🧐 Desafios Enfrentados
- Integrar com a API sem prévia descrição

## 📚 Aprendizados
- Pesquisar nas documentações

## O que é e como usar?

O projeto consiste em intregrar com a API do <a href="https://www.pipedrive.com/pt">Pipedrive</a> para fazer o gerenciamento das Oportunidades(Deals) e Ganhos

Para começar, existem os EndPoints de Registro e Login do Usuario, na rota de registro o usuario fornecerá o TOKEN da API do Pipedrive juntamente com seu email e senha.

Após feito o login, ele tera acesso a rotas das Deals

### All Deals Route

Nessa rota o usuario podera ver todas as deals que ele ja fez, quando ele entrar nessa rota a API chama o banco de dados e faz uma sincronização, fazendo que todas as Deals fiquem salvas no banco!

### Won Deals Route

Na rota Won Deals o usuario poderá ver as Deals que estiverem com status won(ganho)

### Search by day Route

Nessa rota o usuario passara como parametro na URl um dia, a API era buscar no banco de dados todas as Deals feitas naquele dia!

## Como clonar?

```
git clone


