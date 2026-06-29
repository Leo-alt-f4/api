# Rodando o Task Manager API
Este guia ensina como preparar o ambiente, instalar as dependências necessárias, gerar o banco de dados e colocar a aplicação NestJS para rodar.

**1. Pré-requisitos**

Certifique-se de ter instalado em sua máquina:

 - `Node.js` (versão 18 ou superior)

 - `Docker/Docker Compose`

**2. Inicializando o Projeto e Dependências**
Se você estiver iniciando em uma pasta limpa, execute os comandos abaixo no seu terminal para instalar todos os pacotes necessários que o sistema utiliza (`NestJS`, `Prisma`, `Bcrypt`, `JWT` e `Validadores`):

## 1. Instale as dependências de produção
``` bash
npm install @prisma/client class-validator class-transformer bcrypt @nestjs/jwt @nestjs/passport passport passport-jwt
```
## 2. Instale as dependências de desenvolvimento
``` bash
npm install -D prisma @types/bcrypt @types/passport-jwt
```

## 3. Subindo o Banco de Dados (Docker)
Com o arquivo `docker-compose.yml` criado na raiz do projeto, suba o container do MySQL em segundo plano:

``` Bash
docker compose up -d
```

## 4. Gerando as Tabelas no Banco (Prisma Migrations)
Agora que o container do MySQL está rodando, execute o comando do Prisma para ler o arquivo schema.prisma, criar as tabelas de Usuários e Tarefas e gerar o cliente de conexão do ORM:

```Bash
npx prisma migrate dev --name init
```

## 5. Rodando o Sistema
Com tudo configurado, execute o comando abaixo para iniciar o servidor do NestJS em modo de desenvolvimento (com live reload, que reinicia o servidor a cada alteração de código):

```Bash
npm run start:dev
```

O terminal mostrará os módulos sendo carregados e confirmará que a aplicação está escutando na porta 3000:

```
[Nest] 534498  - 06/29/2026, 4:44:22 PM     LOG [NestApplication] Nest application successfully started +143ms
```

## 6. Fluxo de Teste no Postman / Insomnia
Para validar se tudo deu certo, siga esta ordem de requisições HTTP para a URL http://localhost:3000:

Criar Usuário: POST /users enviando name, email e password.
Exemplo:
``` json
{
  "name": "Leonardo Pereira",
  "email": "leocunha@gmail.com",
  "password": "123456"
}
```

Fazer Login: POST /auth/login enviando email e password. Copie o access_token retornado.
``` json
{
  "email": "leocunha@gmail.com",
  "password": "123456"
}
```

O sistema deve retornar:
```json
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyOGUyYzMwNi00N2UyLTQ2ZmQtYjA5OS04NDA2MmMzZDEzYTMiLCJlbWFpbCI6Imxlb2N1bmhhLmNhYnJhbEBnbWFpbC5jb20iLCJpYXQiOjE3ODI3NjM0OTcsImV4cCI6MTc4Mjc2NzA5N30._MTpgXVqH-s9UmL6Xn2x4yPUzwbmmvpPCuZo3-JO_to"}
```

Criar Task: POST /tasks, adicione o Token copiado na aba Authorization (Bearer Token) e envie o JSON com o título, descrição e status da tarefa, além do ID do usuário que irá receber a tarefa:
``` json
{
  "title": "Estudar NestJS",
  "description": "Finalizar os DTOs e validações do projeto",
  "status": "PENDING",
  "userId": "28e2c306-47e2-46fd-b099-84062c3d13a3"
}
```


## 7. Fluxo via swagger
Também é possível visualizar as rotas HTTP pelo [Swagger](http://localhost:3000/api/docs#/), que retorna as áreas de `users`, `tasks` e `auth`, mostrando seu fluxo e o que elas fazem.
Além disso, o código trata a função do código de autorização, podendo realizar as funções HTTP dentro do sistema de uma forma mais simples.