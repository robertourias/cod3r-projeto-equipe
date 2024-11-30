import { Injectable } from '@nestjs/common';
import { UserProps, UserRepository } from '@repo/core';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UserPrisma implements UserRepository {

  constructor(private readonly prisma: PrismaService) { }

  async delete(id: string): Promise<UserProps> {
    return await this.prisma.user.delete({
      where: { id }
    })
  }

  async findById(id: string): Promise<UserProps | null> {
    return await this.prisma.user.findUnique({
      where: { id }
    })
  }

  async findAll(): Promise<UserProps[]> {
    return await this.prisma.user.findMany({})
  }

  //TODO: incluir cryptografia para senha
  async save(user: UserProps): Promise<UserProps> {
    return await this.prisma.user.upsert({
      where: { id: user.id || '00000000-0000-0000-0000-000000000000' },
      update: user,
      create: user as any
    })
  }

  async findByEmail(email: string): Promise<UserProps | null> {
    return await this.prisma.user.findUnique({
      where: { email }
    })
  }

}
