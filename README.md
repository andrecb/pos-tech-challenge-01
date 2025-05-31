# Pos Tech Challenge 01

## 📋 Sobre o Projeto

Este é um sistema de gerenciamento financeiro desenvolvido como parte do desafio técnico da Pós-Tech. O projeto visa fornecer uma solução moderna e eficiente para o controle de finanças pessoais, permitindo que os usuários:

- Criem e gerenciem suas contas de forma segura
- Acompanhem seu saldo em tempo real
- Registrem e categorizem suas transações financeiras
- Visualizem relatórios e análises de seus gastos
- Tenham uma experiência de usuário intuitiva e responsiva

O sistema foi construído utilizando tecnologias modernas como Next.js, TypeScript, Prisma e PostgreSQL, seguindo as melhores práticas de desenvolvimento e arquitetura de software.

## 🚀 Começando

### Pré-requisitos

- Node.js (versão LTS recomendada)
- Docker e Docker Compose
- npm, yarn ou pnpm

### Configuração do Ambiente

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd pos-tech-challenge-01
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### Executando os Serviços

1. Inicie os serviços do Docker:
```bash
cd infra
docker-compose up -d
```

2. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 🛠️ Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Prisma (ORM)
- PostgreSQL
- Docker
- Tailwind CSS
- Shadcn/ui

## 📦 Estrutura do Projeto

- `/src` - Código fonte da aplicação
- `/infra` - Configurações de infraestrutura (Docker)
- `/prisma` - Schema e migrações do banco de dados
- `/public` - Arquivos estáticos

## 🔧 Configuração do Banco de Dados

O projeto utiliza PostgreSQL como banco de dados. As configurações padrão são:

- Host: localhost
- Porta: 5432
- Usuário: pos_tech
- Senha: pos_tech
- Banco: tech_challenge_01

Para atualizar o schema do banco de dados após alterações no Prisma:

```bash
npx prisma generate
npx prisma migrate dev
```

## 🧪 Testes

Para executar os testes:

```bash
npm run test
# ou
yarn test
# ou
pnpm test
```

## 📝 Scripts Disponíveis

- `dev` - Inicia o servidor de desenvolvimento
- `build` - Cria a build de produção
- `start` - Inicia o servidor de produção
- `lint` - Executa o linter
- `test` - Executa os testes