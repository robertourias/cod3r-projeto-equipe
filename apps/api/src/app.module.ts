import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { DbModule } from './db/db.module'
import { UserModule } from './user/user.module'
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    AuthModule,
    DbModule,
    UserModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
