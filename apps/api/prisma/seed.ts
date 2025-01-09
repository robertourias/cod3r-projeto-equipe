// import { prisma } from "../src/lib/prisma"
import bcrypt from 'bcrypt'

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function seed() {

  //Clear tables
  await prisma.profilePermission.deleteMany({});
  await prisma.userPermission.deleteMany({});
  await prisma.userProfile.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.permission.deleteMany({});
  await prisma.user.deleteMany({});
  console.log("DB cleared");


  //Permissions
  const createUsersPerm = await prisma.permission.create({
    data: {
      name: "CREATE_USERS",
      description: "Permissão para criar novos usuários."
    }
  })

  const updateUsersPerm = await prisma.permission.create({
    data: {
      name: "UPDATE_USERS",
      description: "Permissão para alterar usuários."
    }
  })

  const viewUsersPerm = await prisma.permission.create({
    data: {
      name: "VIEW_USERS",
      description: "Permissão para visualizar usuários."
    }
  })

  const createProfile = await prisma.permission.create({
    data: {
      name: "CREATE_PROFILES",
      description: "Permissão para criar novos perfis."
    }
  })

  const updateProfile = await prisma.permission.create({
    data: {
      name: "UPDATE_PROFILES",
      description: "Permissão para alterar perfis."
    }
  })

  const deleteProfile = await prisma.permission.create({
    data: {
      name: "DELETE_PROFILES",
      description: "Permissão para excluir perfis."
    }
  })

  console.log("Permissions...");


  //Insert Profiles
  const adminProfile = await prisma.profile.create({
    data: {
      name: "ADMIN",
      description: "Administrador do sistema",
      Permissions: {
        create: [
          { permissionId: createUsersPerm.id },
          { permissionId: updateUsersPerm.id },
          { permissionId: viewUsersPerm.id },
          { permissionId: createProfile.id },
          { permissionId: updateProfile.id },
          { permissionId: deleteProfile.id },
        ]
      }
    }
  })

  const userProfile = await prisma.profile.create({
    data: {
      name: "USER",
      description: "",
      Permissions: {
        create: [
          { permissionId: viewUsersPerm.id }
        ]
      }
    }
  })

  console.log("Profiles...");



  //Insert Users
  await prisma.user.create({
    data: {
      name: "Administrador",
      email: "admin@zmail.com.br",
      password: await bcrypt.hash("123456", process.env.SALTROUNDS ?? 10),
      Profiles: {
        create: [
          { profileId: adminProfile.id }
        ]
      }
    }
  })

  await prisma.user.create({
    data: {
      name: "Usuário",
      email: "user@zmail.com.br",
      password: await bcrypt.hash("123456", process.env.SALTROUNDS ?? 10),
      Permissions: {
        create: [
          { permissionId: viewUsersPerm.id },
          { permissionId: updateUsersPerm.id }
        ]
      }
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


