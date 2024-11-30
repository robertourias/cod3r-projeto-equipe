import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserProps, CreateUser, UpdateUser, DeleteUser } from '@repo/core';
import { UserPrisma } from 'src/providers/user.prisma';

@Controller('users')
export class UserController {

  constructor(private readonly repo: UserPrisma) { }

  @Get()
  async findAll() {
    try {
      return await this.repo.findAll()
    } catch (error) {
      return error.message
    }
  }

  @Get(":id")
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.repo.findById(id)
      if (!user) return "Nenhum usuário encontrado com ID: " + id
      return user
    } catch (error) {
      return error.message
    }
  }

  @Post("register")
  async register(@Body() user: UserProps) {
    try {
      const usecase = new CreateUser(this.repo)
      return await usecase.execute(user)
    } catch (error) {
      return error.message
    }
  }

  @Put()
  async update(@Body() user: UserProps) {
    try {
      const usecase = new UpdateUser(this.repo)
      return await usecase.execute(user)
    } catch (error: any) {
      return error.message
    }
  }

  @Delete(":id")
  async delete(@Param('id') id: string) {
    try {
      const usecase = new DeleteUser(this.repo)
      return await usecase.execute(id)
    } catch (error) {
      return error.message
    }
  }

}
