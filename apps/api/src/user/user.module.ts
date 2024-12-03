import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DbModule } from 'src/db/db.module';
import { UserPrisma } from 'src/providers/user.prisma';
import { BcryptProvider } from 'src/providers/BcryptProvider';
import { JwtProvider } from 'src/providers/JwtProvider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DbModule],
  controllers: [UserController],
  providers: [UserPrisma, BcryptProvider, JwtProvider]
})
export class UserModule { }
