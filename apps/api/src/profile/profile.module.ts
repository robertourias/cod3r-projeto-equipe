import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { DbModule } from 'src/db/db.module';
import { ProfilePrisma } from 'src/providers/profile.prisma';
import { AuditPrisma } from 'src/providers/audit.prisma';
import { JwtProvider } from 'src/providers/jwt.provider';

@Module({
  imports: [DbModule],
  controllers: [ProfileController],
  providers: [ProfilePrisma, JwtProvider, AuditPrisma]
})
export class ProfileModule { }
