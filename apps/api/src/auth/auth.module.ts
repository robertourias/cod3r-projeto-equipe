import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { DbModule } from 'src/db/db.module'
import { UserPrisma } from '../providers/user.prisma';
import { JwtProvider } from 'src/providers/jwt.provider';
import { BcryptProvider } from 'src/providers/bcrypt.provider';
import { AuditPrisma } from 'src/providers/audit.prisma';
import { EmailProvider } from 'src/providers/email.provider';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [UserPrisma, JwtProvider, BcryptProvider, AuditPrisma, EmailProvider]
})
export class AuthModule { }
