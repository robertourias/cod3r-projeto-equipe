// import { prisma } from "../src/lib/prisma"
import bcrypt from 'bcrypt'

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function seed() {

  //Clear tables
  await prisma.user.deleteMany({});

  console.log("DB cleared");


  //Insert Users
  await prisma.user.create({
    data: {
      name: "Administrador",
      email: "admin@zmail.com.br",
      password: await bcrypt.hash("123456", process.env.SALTROUNDS ?? 10)
    }
  })

  console.log("Users...");

}


seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


