# Passos para rodar o projeto

1) instalar as dependencias:
   npm install
   
2) entrar na pasta:
   cd apps/api
   
3) renomear .env.sample para .env e ajustar os valores
   mv .env.sample .env
   
4) criar/atualizar o banco de dados
   npx prisma migrate dev
   
5) opcional: resetar o banco de dados
   npm run seed
   
6) voltar para raiz e executar o projeto:
   cd ../..
   npm run dev
