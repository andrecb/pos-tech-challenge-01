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
- PostgreSQL 16

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

3. Configure o arquivo .env:
```bash
# Copie o arquivo .env.example para .env
cp .env.example .env

# Edite o arquivo .env e configure a URL do banco de dados
DATABASE_URL="postgresql://pos_tech:pos_tech@localhost:5432/tech_challenge_01"
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

## 📚 Storybook

O projeto utiliza o Storybook para desenvolvimento e documentação de componentes. Para trabalhar com o Storybook:

1. Inicie o Storybook em modo de desenvolvimento:
```bash
npm run storybook
# ou
yarn storybook
# ou
pnpm storybook
```

2. Para criar uma build estática do Storybook:
```bash
npm run build-storybook
# ou
yarn build-storybook
# ou
pnpm build-storybook
```

O Storybook estará disponível em [http://localhost:6006](http://localhost:6006) por padrão.

## 📦 Estrutura do Projeto

- `/src` - Código fonte da aplicação
- `/infra` - Configurações de infraestrutura (Docker)
- `/prisma` - Schema e migrações do banco de dados
- `/public` - Arquivos estáticos

## 🔧 Configuração do Banco de Dados

O projeto utiliza PostgreSQL 16 como banco de dados. As configurações padrão são:

- Host: localhost
- Porta: 5432
- Usuário: pos_tech
- Senha: pos_tech
- Banco: tech_challenge_01

Para instalar o PostgreSQL 16:

### macOS (usando Homebrew):
```bash
brew install postgresql@16
brew services start postgresql@16
```

### Linux (Ubuntu/Debian):
```bash
# Adicione o repositório oficial do PostgreSQL
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update

# Instale o PostgreSQL 16
sudo apt-get install postgresql-16
```

### Windows:
1. Baixe o instalador do PostgreSQL 16 do site oficial: https://www.postgresql.org/download/windows/
2. Execute o instalador e siga as instruções na tela

Após a instalação, crie o banco de dados e o usuário:

```bash
# Acesse o PostgreSQL
psql -U postgres

# Crie o usuário e o banco de dados
CREATE USER pos_tech WITH PASSWORD 'pos_tech';
CREATE DATABASE tech_challenge_01;
GRANT ALL PRIVILEGES ON DATABASE tech_challenge_01 TO pos_tech;
```

Para atualizar o schema do banco de dados após alterações no Prisma:

```bash
npx prisma generate
npx prisma migrate dev
```

## 📝 Scripts Disponíveis

- `dev` - Inicia o servidor de desenvolvimento
- `build` - Cria a build de produção
- `start` - Inicia o servidor de produção
- `lint` - Executa o linter
- `test` - Executa os testes
- `storybook` - Inicia o Storybook em modo de desenvolvimento
- `build-storybook` - Cria uma build estática do Storybook