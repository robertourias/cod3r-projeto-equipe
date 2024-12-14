import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DbModule } from 'src/db/db.module';
import { UserPrisma } from 'src/providers/user.prisma';
import { BcryptProvider } from 'src/providers/bcrypt.provider';
import { JwtProvider } from 'src/providers/jwt.provider';

@Module({
  imports: [DbModule],
  controllers: [UserController],
  providers: [UserPrisma, BcryptProvider, JwtProvider]
})
export class UserModule { }
