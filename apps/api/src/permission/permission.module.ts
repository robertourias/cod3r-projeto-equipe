import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { DbModule } from 'src/db/db.module';
import { PermissionPrisma } from 'src/providers/permission.prisma';
import { AuditPrisma } from 'src/providers/audit.prisma';
import { JwtProvider } from 'src/providers/jwt.provider';

@Module({
  imports: [DbModule],
  controllers: [PermissionController],
  providers: [PermissionPrisma, JwtProvider, AuditPrisma]
})
export class PermissionModule { }
