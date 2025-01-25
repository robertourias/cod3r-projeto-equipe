import { Injectable } from '@nestjs/common';
import { PermissionProfileProps, PermissionProps, PermissionRepository, PermissionUserProps, ProfileProps, UserProps } from '@repo/core';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class PermissionPrisma implements PermissionRepository {

  constructor(private readonly prisma: PrismaService) { }

  async findUserById(id: string): Promise<UserProps | null> {
    return await this.prisma.user.findFirst({
      where: {
        id
      }
    })
  }

  async findPermissionOnUser(permissionId: number, userId: string): Promise<PermissionUserProps | null> {
    return await this.prisma.userPermission.findFirst({
      where: {
        userId: userId,
        permissionId: +permissionId
      },
      select: {
        permissionId: true,
        userId: true,
        Permission: {
          select: {
            id: true,
            name: true
          }
        },
        User: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
  }

  async addPermissionToUser(permissionId: number, userId: string): Promise<PermissionUserProps | null> {
    return await this.prisma.userPermission.create({
      data: {
        userId: userId,
        permissionId: +permissionId
      },
      select: {
        permissionId: true,
        userId: true,
        Permission: {
          select: {
            id: true,
            name: true
          }
        },
        User: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
  }

  async removePermissionFromUser(permissionId: number, userId: string): Promise<PermissionUserProps | null> {
    return await this.prisma.userPermission.delete({
      where: {
        userId_permissionId: {
          userId: userId,
          permissionId: +permissionId
        }
      },
      select: {
        permissionId: true,
        userId: true,
        Permission: {
          select: {
            id: true,
            name: true
          }
        },
        User: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
  }

  async findProfileById(id: string): Promise<ProfileProps | null> {
    return await this.prisma.profile.findFirst({
      where: {
        id: +id
      }
    })
  }

  async findPermissionOnProfile(permissionId: number, profileId: number): Promise<PermissionProfileProps | null> {
    return await this.prisma.profilePermission.findFirst({
      where: {
        profileId: +profileId,
        permissionId: +permissionId
      },
      select: {
        permissionId: true,
        profileId: true,
        Permission: {
          select: {
            id: true,
            name: true
          }
        },
        Profile: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })
  }

  async addPermissionToProfile(permissionId: number, profileId: number): Promise<PermissionProfileProps | null> {
    return await this.prisma.profilePermission.create({
      data: {
        profileId: +profileId,
        permissionId: +permissionId
      },
      select: {
        permissionId: true,
        profileId: true,
        Permission: {
          select: {
            id: true,
            name: true
          }
        },
        Profile: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })
  }

  async removePermissionFromProfile(permissionId: number, profileId: number): Promise<PermissionProfileProps | null> {
    return await this.prisma.profilePermission.delete({
      where: {
        profileId_permissionId: {
          profileId: +profileId,
          permissionId: +permissionId
        }
      },
      select: {
        permissionId: true,
        profileId: true,
        Permission: {
          select: {
            id: true,
            name: true
          }
        },
        Profile: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })
  }


  async findByName(name: string): Promise<PermissionProps | null> {
    return await this.prisma.permission.findUnique({
      where: {
        name
      }
    })
  }

  async save(permission: PermissionProps): Promise<PermissionProps> {
    console.log("permission:", permission)
    return await this.prisma.permission.upsert({
      where: { id: permission.id ? +permission.id : -1 },
      update: permission as any,
      create: permission as any,
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        disabledAt: true,
      }
    })
  }

  async findById(id: string): Promise<PermissionProps | null> {
    return await this.prisma.permission.findFirst({
      where: {
        id: +id
      },
      include: {
        Profiles: {
          select: {
            id: true,
            Profile: true,
          }
        },
        Users: {
          select: {
            id: true,
            User: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    })
  }

  async findAll(): Promise<PermissionProps[]> {
    return await this.prisma.permission.findMany({})
  }

  async delete(id: number): Promise<PermissionProps> {
    return await this.prisma.permission.delete({
      where: {
        id: +id
      }
    })
  }

  async userHasPermission(userId: string, permissionName: string): Promise<boolean> {
    // Verifica se há uma permissão associada ao usuário através de seus perfis

    //TODO: refatorar?: essa validação deveria estar no core?
    const hasPermission = await this.prisma.permission.findFirst({
      where: {
        name: permissionName,
        Users: {
          some: {
            Permission: {
              Users: {
                some: {
                  userId: userId
                }
              }
            }
          }
        }
      }
    })

    const hasProfilePermission = await this.prisma.permission.findFirst({
      where: {
        name: permissionName,
        Profiles: {
          some: {
            Profile: {
              Users: {
                some: {
                  userId: userId,
                },
              },
            },
          },
        },
      },
    });

    // console.log("hasPermission:", hasPermission)
    // console.log("hasProfilePermission:", hasProfilePermission)

    // Retorna verdadeiro se a permissão existir
    return Boolean(hasPermission) || Boolean(hasProfilePermission)
  }


  async findUserByEmail(email: string): Promise<UserProps> {
    const result = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        phone: false,
        profileUrl: false,
        recoveryToken: false,
        tokenExpiration: false,
        twoFactorAuth: false,
        createdAt: true,
        updatedAt: true,
        disabledAt: true,
        Permissions: true
      }
    })
    return result
  }

}