import { Injectable } from '@nestjs/common';
import { UserProps, UserRepository } from '@repo/core';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UserPrisma implements UserRepository {

  constructor(private readonly prisma: PrismaService) { }

  async save(user: UserProps, withPassword: boolean = false): Promise<UserProps> {
    return await this.prisma.user.upsert({
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
  }

  async findById(id: string, withPassword: boolean = false): Promise<UserProps | null> {
    return await this.prisma.user.findUnique({
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
  }

  async findAll(withPassword: boolean = false): Promise<UserProps[]> {
    return await this.prisma.user.findMany({
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
  }

  async findByEmail(email: string, withPassword: boolean = false): Promise<UserProps | null> {
    return await this.prisma.user.findUnique({
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
  }

  async delete(id: string): Promise<UserProps> {
    return await this.prisma.user.delete({
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
  }

}
