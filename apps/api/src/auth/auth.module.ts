import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { DbModule } from 'src/db/db.module'
import { UserPrisma } from '../providers/user.prisma';
import { JwtProvider } from 'src/providers/JwtProvider';
import { BcryptProvider } from 'src/providers/BcryptProvider';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [UserPrisma, JwtProvider, BcryptProvider]
})
export class AuthModule { }
