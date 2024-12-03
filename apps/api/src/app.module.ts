import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { DbModule } from './db/db.module'
import { UserModule } from './user/user.module'
// import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    AuthModule,
    DbModule,
    UserModule,
    // ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
