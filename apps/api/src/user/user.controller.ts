import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { RequestProps, CreateUser, UpdateUser, DeleteUser, FindUsers, ToggleUser, GenerateToken, RecoveryPassword} from '@repo/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { BcryptProvider } from 'src/providers/BcryptProvider';
import { JwtProvider } from 'src/providers/JwtProvider';
import { UserPrisma } from 'src/providers/user.prisma';
import { UserService } from './user.service';



@Controller('users')
export class UserController {

  constructor(
    private readonly repo: UserPrisma,
    private readonly crypto: BcryptProvider,
    private readonly tokenProvider: JwtProvider,
    private readonly userService: UserService,
  ) { }

  //registro de usuários será aberto?
  @Post("register")
  async register(@Body() data: RequestProps) {
    try {
      const usecase = new CreateUser(this.repo, this.crypto, this.tokenProvider)
      return await usecase.execute(data?.user)
    } catch (error: any) {
      console.error(error)
      return error.message
    }
  }

  @Post("esqueci-senha")
  async forgot(@Body() data: RequestProps) {
    try {
      const email = data?.user.email
      const usecase = new GenerateToken(this.repo);
      const user = await usecase.execute(email)
      if(!user){
        throw new BadRequestException("Email não encontrado");
      }else{
        await this.userService.sendEmail(user.email, user.recoveryToken);
        return user
      }
    } catch (error) {
      return error.message
    }
  }

  @Put("recuperar-senha")
  async recovery(@Body() data: any,@Query('email') email: string, @Query('token') token: string) {
    try {
      const usecase = new RecoveryPassword(this.repo, this.crypto);
      data = {...data, email, token}
      await usecase.execute(data)
      
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post("toggle/:id")
  @UseGuards(AuthGuard)
  async toggleStatus(@Param('id') id: string) {
    try {
      console.log("id:", id)
      const usecase = new ToggleUser(this.repo)
      return await usecase.execute(id)
    } catch (error: any) {
      console.error(error)
      return error.message
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    try {
      const usecase = new FindUsers(this.repo)
      return await usecase.execute()
    } catch (error: any) {
      return error.message
    }
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    try {
      const usecase = new FindUsers(this.repo)
      const user = await usecase.execute(id)
      if (!user) return "Usuário não encontrado"
      return user
    } catch (error: any) {
      return error.message
    }
  }

  @Put()
  @UseGuards(AuthGuard)
  async update(@Body() data: RequestProps) {
    try {
      const usecase = new UpdateUser(this.repo, this.crypto)
      return await usecase.execute(data.user)
    } catch (error: any) {
      return error.message
    }
  }

  //usuários podem ser excluídos ou só inativados?
  @Delete(":id")
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string) {
    try {
      const usecase = new DeleteUser(this.repo)
      return await usecase.execute(id)
    } catch (error: any) {
      
      return error.message
    }
  }

} 
