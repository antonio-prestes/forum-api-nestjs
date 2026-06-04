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

### Users

| Método | Rota         | Descrição          |
|--------|--------------|--------------------|
| POST   | `/user/user` | Criar usuário      |

### Questions

| Método | Rota              | Descrição                              |
|--------|--------------------|----------------------------------------|
| POST   | `/questions`       | Criar pergunta                         |
| GET    | `/questions`       | Listar todas (com autor e nº respostas)|
| GET    | `/questions/:id`   | Detalhar pergunta com respostas        |
| PUT    | `/questions/:id`   | Atualizar pergunta                     |
| DELETE | `/questions/:id`   | Remover pergunta                       |

### Answers

| Método | Rota             | Descrição            |
|--------|------------------|----------------------|
| POST   | `/answers`       | Criar resposta       |
| PUT    | `/answers/:id`   | Atualizar resposta   |
| DELETE | `/answers/:id`   | Remover resposta     |

> Documentação interativa disponível em `http://localhost:3000/api` (Swagger UI).

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
