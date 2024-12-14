import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { DbModule } from './db/db.module'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { SendGridModule } from '@anchan828/nest-sendgrid'
// import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    AuthModule,
    DbModule,
    UserModule,
    ConfigModule.forRoot(),
    SendGridModule.forRoot({apikey: process.env.SEND_GRID_ACCESS_KEY})
    // ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
