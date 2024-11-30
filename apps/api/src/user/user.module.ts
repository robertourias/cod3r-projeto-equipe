import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DbModule } from 'src/db/db.module';
import { UserPrisma } from 'src/providers/user.prisma';

@Module({
  imports: [DbModule],
  controllers: [UserController],
  providers: [UserPrisma]
})
export class UserModule { }
