// import { prisma } from "../src/lib/prisma"
import bcrypt from 'bcrypt'

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function seed() {

  //Clear tables
  await prisma.audit.deleteMany({});
  await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0 WHERE name = 'audits';`
  await prisma.profilePermission.deleteMany({});
  await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0 WHERE name = 'profile_permissions';`
  await prisma.userPermission.deleteMany({});
  await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0 WHERE name = 'user_permissions';`
  await prisma.userProfile.deleteMany({});
  await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0 WHERE name = 'user_profile';`
  await prisma.profile.deleteMany({});
  await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0 WHERE name = 'profiles';`
  await prisma.permission.deleteMany({});
  await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0 WHERE name = 'permissions';`
  await prisma.user.deleteMany({});
  await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0 WHERE name = 'users';`
  console.log("DB cleared");



  //*** Permissions ***
  //User
  const createUser = await prisma.permission.create({
    data: {
      name: "CREATE_USER",
      description: "Permissão para criar novos usuários."
    }
  })

  const findUser = await prisma.permission.create({
    data: {
      name: "FIND_USER",
      description: "Permissão para visualizar usuários."
    }
  })

  const updateUser = await prisma.permission.create({
    data: {
      name: "UPDATE_USER",
      description: "Permissão para alterar usuários."
    }
  })

  const deleteUser = await prisma.permission.create({
    data: {
      name: "DELETE_USER",
      description: "Permissão para excluir usuários."
    }
  })

  const toggleUser = await prisma.permission.create({
    data: {
      name: "TOGGLE_USER",
      description: "Permissão para ativar/inativar usuários."
    }
  })


  //Profile
  const createProfile = await prisma.permission.create({
    data: {
      name: "CREATE_PROFILE",
      description: "Permissão para criar novo perfil."
    }
  })

  const findProfile = await prisma.permission.create({
    data: {
      name: "FIND_PROFILE",
      description: "Permissão para visualizar perfil."
    }
  })

  const updateProfile = await prisma.permission.create({
    data: {
      name: "UPDATE_PROFILE",
      description: "Permissão para alterar perfil."
    }
  })

  const deleteProfile = await prisma.permission.create({
    data: {
      name: "DELETE_PROFILE",
      description: "Permissão para excluir perfil."
    }
  })

  const toggleProfile = await prisma.permission.create({
    data: {
      name: "TOGGLE_PROFILE",
      description: "Permissão para ativar/inativar perfil."
    }
  })


  //Permission
  const createPermission = await prisma.permission.create({
    data: {
      name: "CREATE_PERMISSION",
      description: "Permissão para criar novo permissão."
    }
  })

  const findPermission = await prisma.permission.create({
    data: {
      name: "FIND_PERMISSION",
      description: "Permissão para visualizar permissão."
    }
  })

  const updatePermission = await prisma.permission.create({
    data: {
      name: "UPDATE_PERMISSION",
      description: "Permissão para alterar permissão."
    }
  })

  const deletePermission = await prisma.permission.create({
    data: {
      name: "DELETE_PERMISSION",
      description: "Permissão para excluir permissão."
    }
  })

  const togglePermission = await prisma.permission.create({
    data: {
      name: "TOGGLE_PERMISSION",
      description: "Permissão para ativar/inativar permissão."
    }
  })

  const addPermissionToProfile = await prisma.permission.create({
    data: {
      name: "ADD_PERMISSION_PROFILE",
      description: "Vincular permissão a um perfil"
    }
  })

  const removePermissionFromProfile = await prisma.permission.create({
    data: {
      name: "REMOVE_PERMISSION_PROFILE",
      description: "Remover permissão de um perfil"
    }
  })

  const addPermissionToUser = await prisma.permission.create({
    data: {
      name: "ADD_PERMISSION_USER",
      description: "Vincular permissão a um usuário"
    }
  })

  const removePermissionFromUser = await prisma.permission.create({
    data: {
      name: "REMOVE_PERMISSION_USER",
      description: "Remover permissão de um usuário"
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
          { permissionId: createUser.id },
          { permissionId: findUser.id },
          { permissionId: updateUser.id },
          { permissionId: deleteUser.id },
          { permissionId: toggleUser.id },

          { permissionId: createProfile.id },
          { permissionId: findProfile.id },
          { permissionId: updateProfile.id },
          { permissionId: deleteProfile.id },
          { permissionId: toggleProfile.id },

          { permissionId: createPermission.id },
          { permissionId: findPermission.id },
          { permissionId: updatePermission.id },
          { permissionId: deletePermission.id },
          { permissionId: togglePermission.id },
          { permissionId: addPermissionToProfile.id },
          { permissionId: removePermissionFromProfile.id },
          { permissionId: addPermissionToUser.id },
          { permissionId: removePermissionFromUser.id },
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
          { permissionId: findUser.id },
          { permissionId: findProfile.id },
          { permissionId: findPermission.id }
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
      password: await bcrypt.hash("123456Aa@", process.env.SALTROUNDS ?? 10),
      Profiles: {
        create: [
          { profileId: adminProfile.id }
        ]
      }
    }
  })

  await prisma.user.create({
    data: {
      name: "user1",
      email: "user1@zmail.com.br",
      password: await bcrypt.hash("123456Gg@", process.env.SALTROUNDS ?? 10),
      Profiles: {
        create: [
          { profileId: userProfile.id }
        ]
      }
    }
  })

  //exemplo vinculando permissões
  // await prisma.user.create({
  //   data: {
  //     name: "Usuário",
  //     email: "user@zmail.com.br",
  //     password: await bcrypt.hash("123456Aa@", process.env.SALTROUNDS ?? 10),
  //     Permissions: {
  //       create: [
  //         { permissionId: findUser.id },
  //         { permissionId: updateUser.id }
  //       ]
  //     }
  //   }
  // })

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


