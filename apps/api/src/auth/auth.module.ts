import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { DbModule } from 'src/db/db.module'
import { UserPrisma } from '../providers/user.prisma';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [UserPrisma]
})
export class AuthModule { }
