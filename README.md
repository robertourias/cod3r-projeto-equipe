# Passos para rodar o projeto
1) npm install
2) renomear .env.sample para .env e ajustar os valores
3) cd apps/api -> npx prisma migrate dev
4) npm run seed (dentro de apps/api)
5) cd ../.. -> npm run dev
