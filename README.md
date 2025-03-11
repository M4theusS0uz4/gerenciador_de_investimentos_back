# Gerenciador de Investimentos Pessoais

Este é um sistema de gerenciamento de investimentos pessoais que permite ao usuário criar e controlar seus investimentos, gerenciar saldos e acompanhar suas receitas e despesas.

## Tecnologias Usadas
- Node.js
- Express
- PostgreSQL
- TypeScript
- Prisma (ORM para interação com o banco de dados)
## Instalação


1. Clone o repositório:
   ```bash
   git clone https://github.com/M4theusS0uz4/gerenciador_de_investimentos  

2. Navegue até o diretório do projeto:
   ```bash
   cd gerenciador_de_investimentos

3. Instale as Dependências:
   ```bash
   npm install

4. Criar arquivo .env na raiz do projeto com as configurações do seu banco de dados:
   ```
   DATABASE_URL="postgresql://SEUHOST:SUASENHA@localhost:SUAPORTA/NOMEDOSEUBANCO?schema=public"
   
5. Gerar cliente primas:
   ```bash
   npx prisma generate
   
6. Rodar migrações (Criar banco e tabelas):
   ```bash
   npx prisma migrate dev

7. Compile os arquivos TypeScript:
   ```bash
   npm run build

