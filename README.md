# Forum API

REST API para um fórum de perguntas e respostas construída com **NestJS**, **Prisma ORM** e **PostgreSQL**, containerizada com **Docker**.

## Tecnologias

- [NestJS](https://nestjs.com/) — Framework Node.js com arquitetura modular e injeção de dependência
- [Prisma 7](https://www.prisma.io/) — ORM com driver adapter (`@prisma/adapter-pg`)
- [PostgreSQL](https://www.postgresql.org/) — Banco de dados relacional
- [Docker](https://www.docker.com/) — Containerização da aplicação e do banco
- [Swagger](https://swagger.io/) — Documentação interativa da API (`@nestjs/swagger`)
- [Jest](https://jestjs.io/) — Testes unitários
- [TypeScript](https://www.typescriptlang.org/)

## Estrutura do Projeto

```
src/
├── auth/              # Módulo de autenticação
├── database/          # PrismaService (conexão com o banco via driver adapter)
├── user/              # CRUD de usuários
├── question/          # CRUD de perguntas (posts do fórum)
├── answer/            # CRUD de respostas (comentários)
├── app.module.ts      # Módulo raiz
└── main.ts            # Bootstrap + configuração do Swagger
```

## Modelagem

```
User 1──N Questions
User 1──N Answers
Questions 1──N Answers
```

| Model     | Campos principais                          |
|-----------|--------------------------------------------|
| User      | id, email, name?, password                 |
| Questions | id, title, body, userId                    |
| Answers   | id, body, userId, questionId               |

## Endpoints

### Autenticação & Usuários

| Método | Rota            | Descrição                         | Autenticação |
|--------|-----------------|-----------------------------------|--------------|
| POST   | `/auth/signup`  | Cadastrar um novo usuário         | Nenhuma      |
| POST   | `/auth/login`   | Fazer login e obter o token JWT   | Nenhuma      |
| GET    | `/users/me`     | Obter perfil do usuário logado     | Bearer Token |

### Questions (Perguntas)

| Método | Rota            | Descrição                                 | Autenticação |
|--------|-----------------|-------------------------------------------|--------------|
| POST   | `/questions`    | Criar uma nova pergunta                   | Bearer Token |
| GET    | `/questions`    | Listar todas as perguntas                 | Nenhuma      |
| GET    | `/questions/:id`| Detalhar uma pergunta com suas respostas  | Nenhuma      |
| PUT    | `/questions/:id`| Atualizar uma pergunta                    | Bearer Token |
| DELETE | `/questions/:id`| Remover uma pergunta                      | Bearer Token |

### Answers (Respostas)

| Método | Rota                                  | Descrição                                | Autenticação |
|--------|---------------------------------------|------------------------------------------|--------------|
| POST   | `/questions/:questionId/answers`      | Criar resposta para uma pergunta         | Bearer Token |
| PUT    | `/answers/:id`                        | Atualizar uma resposta                   | Bearer Token |
| DELETE | `/answers/:id`                        | Remover uma resposta                     | Bearer Token |

> **Nota sobre Autenticação**: Os endpoints protegidos por autenticação exigem o envio do token JWT no cabeçalho HTTP `Authorization: Bearer <seu_token>`.
> A documentação interativa e testes de requisição podem ser feitos diretamente em `http://localhost:3000/api` (Swagger UI), inserindo o token JWT através do botão "Authorize".

## Como rodar

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/)

### Subir os containers

```bash
docker compose up --build -d
```

Isso inicia o PostgreSQL e a API em modo de desenvolvimento (`--watch`).

### Criar as tabelas no banco

```bash
docker exec forum-api-app npx prisma db push
```

### Acessar

- **API:** `http://localhost:3000`
- **Swagger:** `http://localhost:3000/api`

### Parar os containers

```bash
docker compose down
```

## Rodar localmente (sem Docker)

```bash
# Instalar dependências
npm install

# Configurar variável de ambiente
cp .env.example .env
# Preencher DATABASE_URL no .env

# Gerar Prisma Client
npx prisma generate

# Sincronizar banco
npx prisma db push

# Iniciar em modo dev
npm run start:dev
```

## Testes

```bash
# Testes unitários
npm run test

# Cobertura
npm run test:cov
```
