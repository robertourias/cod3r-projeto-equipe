import { Injectable } from '@nestjs/common';
import { UserProps, UserRepository } from '@repo/core';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UserPrisma implements UserRepository {

  constructor(private readonly prisma: PrismaService) { }

  async save(user: UserProps, withPassword: boolean = false): Promise<UserProps> {

    const result = await this.prisma.user.upsert({
      where: { id: user.id || '00000000-0000-0000-0000-000000000000' },
      update: user as any,
      create: user as any,
      select: {
        id: true,
        name: true,
        email: true,
        password: withPassword,
        phone: true,
        profileUrl: true,
        recoveryToken: true,
        tokenExpiration: true,
        twoFactorAuth: true,
        createdAt: true,
        updatedAt: true,
        disabledAt: true,
      }
    })

    //TODO: arrumar o horário ou deixar como está?
    //prisma salva em UTC - converte de volta para data/hora local
    // const createdDate = new Date(result.createdAt).toLocaleString("pt-BR", { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo' })
    // const updatedDate = new Date(result.updatedAt).toLocaleString("pt-BR", { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo' })
    // const disabledDate = new Date(result.disabledAt).toLocaleString("pt-BR", { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo' })
    // console.log("dates: ", createdDate, updatedDate, disabledDate)
    // result.createdAt = new Date(createdDate)
    // result.updatedAt = new Date(updatedDate)
    // result.disabledAt = new Date(disabledDate)
    return result
  }

  async findById(id: string, withPassword: boolean = false): Promise<UserProps | null> {
    const result = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        password: withPassword,
        phone: true,
        profileUrl: true,
        recoveryToken: true,
        tokenExpiration: true,
        twoFactorAuth: true,
        createdAt: true,
        updatedAt: true,
        disabledAt: true,
      }
    })
    //prisma salva em UTC - converte de volta para data/hora local
    // const createdDate = new Date(result.createdAt).toLocaleString("pt-BR", { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo' })
    // const updatedDate = new Date(result.updatedAt).toLocaleString("pt-BR", { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo' })
    // const disabledDate = new Date(result.disabledAt).toLocaleString("pt-BR", { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo' })
    // console.log("dates: ", createdDate, updatedDate, disabledDate)
    // result.createdAt = new Date(createdDate)
    // result.updatedAt = new Date(updatedDate)
    // result.disabledAt = new Date(disabledDate)
    return result
  }

  async findAll(withPassword: boolean = false): Promise<UserProps[]> {
    const result = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: withPassword,
        phone: true,
        profileUrl: true,
        recoveryToken: true,
        tokenExpiration: true,
        twoFactorAuth: true,
        createdAt: true,
        updatedAt: true,
        disabledAt: true,
      }
    })
    //array
    //prisma salva em UTC - converte de volta para data/hora local
    // const createdDate = new Date(result.createdAt).toLocaleString("pt-BR", { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo' })
    // const updatedDate = new Date(result.updatedAt).toLocaleString("pt-BR", { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo' })
    // const disabledDate = new Date(result.disabledAt).toLocaleString("pt-BR", { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo' })
    // result.createdAt = new Date(createdDate)
    // result.updatedAt = new Date(updatedDate)
    // result.disabledAt = new Date(disabledDate)
    return result
  }

  async findByEmail(email: string, withPassword: boolean = false): Promise<UserProps | null> {
    const result = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: withPassword,
        phone: true,
        profileUrl: true,
        recoveryToken: true,
        tokenExpiration: true,
        twoFactorAuth: true,
        createdAt: true,
        updatedAt: true,
        disabledAt: true,
      }
    })
    //prisma salva em UTC - converte de volta para data/hora local
    // const createdDate = new Date(result.createdAt).toLocaleString("pt-BR", { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo' })
    // const updatedDate = new Date(result.updatedAt).toLocaleString("pt-BR", { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo' })
    // const disabledDate = new Date(result.disabledAt).toLocaleString("pt-BR", { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo' })
    // result.createdAt = new Date(createdDate)
    // result.updatedAt = new Date(updatedDate)
    // result.disabledAt = new Date(disabledDate)
    return result
  }

  async delete(id: string): Promise<UserProps> {
    const result = await this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        phone: true,
        profileUrl: true,
        recoveryToken: true,
        tokenExpiration: true,
        twoFactorAuth: true,
        createdAt: true,
        updatedAt: true,
        disabledAt: true,
      }
    })
    //prisma salva em UTC - converte de volta para data/hora local
    // const createdDate = new Date(result.createdAt).toLocaleString("pt-BR", { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo' })
    // const updatedDate = new Date(result.updatedAt).toLocaleString("pt-BR", { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo' })
    // const disabledDate = new Date(result.disabledAt).toLocaleString("pt-BR", { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo' })
    // result.createdAt = new Date(createdDate)
    // result.updatedAt = new Date(updatedDate)
    // result.disabledAt = new Date(disabledDate)
    return result
  }

}
