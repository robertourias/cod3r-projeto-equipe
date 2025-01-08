import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DbModule } from 'src/db/db.module';
import { UserPrisma } from 'src/providers/user.prisma';
import { BcryptProvider } from 'src/providers/bcrypt.provider';
import { JwtProvider } from 'src/providers/jwt.provider';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { EmailProvider } from 'src/providers/email.provider';

@Module({
  imports: [DbModule],
  controllers: [UserController],
  providers: [UserPrisma, BcryptProvider, JwtProvider, UserService, EmailProvider]
})
export class UserModule { }
