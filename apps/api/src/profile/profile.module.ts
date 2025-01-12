import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { DbModule } from 'src/db/db.module';
import { ProfilePrisma } from 'src/providers/profile.prisma';
import { AuditPrisma } from 'src/providers/audit.prisma';
import { JwtProvider } from 'src/providers/jwt.provider';
import { PermissionPrisma } from 'src/providers/permission.prisma';

@Module({
  imports: [DbModule],
  controllers: [ProfileController],
  providers: [ProfilePrisma, PermissionPrisma, JwtProvider, AuditPrisma]
})
export class ProfileModule { }
