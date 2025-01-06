import { Injectable } from '@nestjs/common';
import { AuditRepository, UserProps } from '@repo/core';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AuditPrisma implements AuditRepository {

  constructor(private readonly prisma: PrismaService) { }

  async save(data: any): Promise<void> {
    await this.prisma.audit.create({
      data: {
        ...data
      }
    })
  }

}