import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Put, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { CreateUser, UpdateUser, DeleteUser, FindUsers, ToggleUser, UserProps, } from '@repo/core';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { CustomFilter } from 'src/errors/custom/custom.filter';
import { AuditPrisma } from 'src/providers/audit.prisma';
import { BcryptProvider } from 'src/providers/bcrypt.provider';
import { JwtProvider } from 'src/providers/jwt.provider';
import { UserPrisma } from 'src/providers/user.prisma';


@Controller('users')
@UseFilters(CustomFilter)
export class UserController {

  constructor(
    private readonly repo: UserPrisma,
    private readonly crypto: BcryptProvider,
    private readonly tokenProvider: JwtProvider,
    private readonly auditProvider: AuditPrisma
  ) { }

  //registro de usuários será aberto?
  @Post("register")
  async register(
    @Body() data: UserProps,
    @Res() res: Response,
    @Headers("host") host: string,
    @Headers("user-agent") userAgent: string,
  ) {

    const usecase = new CreateUser(this.repo, this.crypto, this.tokenProvider, this.auditProvider)
    const result = await usecase.execute(data, { host, userAgent })

    if (result.success) {
      res.status(result?.status ?? 200).json({
        status: result.status,
        message: result.message,
        data: result.data
      })

    } else {
      throw new HttpException(result.message, result.status, { cause: result.errors })
    }
  }


  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @Res() res: Response,
    @Headers("host") host: string,
    @Headers("user-agent") userAgent: string,
    @Headers("authorization") authorization: string
  ) {

    const [tokenType, tokenValue] = authorization?.split(" ")
    const payload = await JwtProvider.getPayload(tokenValue)
    const user = { email: payload.email, host, userAgent }

    const usecase = new FindUsers(this.repo, this.auditProvider)
    const result = await usecase.execute(undefined, user)

    if (result.success) {
      res.status(result?.status ?? 200).json({
        status: result.status,
        message: result.message,
        data: result.data
      })

    } else {
      throw new HttpException(result.message, result.status, { cause: result.errors })
    }
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
    @Headers("host") host: string,
    @Headers("user-agent") userAgent: string,
    @Headers("authorization") authorization: string
  ) {

    const [tokenType, tokenValue] = authorization?.split(" ")
    const payload = await JwtProvider.getPayload(tokenValue)
    const user = { email: payload.email, host, userAgent }

    const usecase = new FindUsers(this.repo, this.auditProvider)
    const result = await usecase.execute(id, user)


    if (result.success) {
      res.status(result?.status ?? 200).json({
        status: result.status,
        message: result.message,
        data: result.data
      })

    } else {
      throw new HttpException(result.message, result.status, { cause: result.errors })
    }
  }

  @Put()
  @UseGuards(AuthGuard)
  async update(
    @Body() data: UserProps,
    @Res() res: Response,
    @Headers("host") host: string,
    @Headers("user-agent") userAgent: string,
    @Headers("authorization") authorization: string
  ) {

    const [tokenType, tokenValue] = authorization?.split(" ")
    const payload = await JwtProvider.getPayload(tokenValue)
    const user = { email: payload.email, host, userAgent }

    const usecase = new UpdateUser(this.repo, this.crypto, this.auditProvider)
    const result = await usecase.execute(data, user)

    if (result.success) {
      res.status(result?.status ?? 200).json({
        status: result.status,
        message: result.message,
        data: result.data
      })

    } else {
      throw new HttpException(result.message, result.status, { cause: result.errors })
    }

  }

  @Post("toggle/:id")
  @UseGuards(AuthGuard)
  async toggleStatus(
    @Param('id') id: string,
    @Res() res: Response,
    @Headers("host") host: string,
    @Headers("user-agent") userAgent: string,
    @Headers("authorization") authorization: string
  ) {

    const [tokenType, tokenValue] = authorization?.split(" ")
    const payload = await JwtProvider.getPayload(tokenValue)
    const user = { email: payload.email, host, userAgent }

    const usecase = new ToggleUser(this.repo, this.auditProvider)
    const result = await usecase.execute(id, user)

    if (result.success) {
      res.status(result?.status ?? 200).json({
        status: result.status,
        message: result.message,
        data: result.data
      })

    } else {
      throw new HttpException(result.message, result.status, { cause: result.errors })
    }
  }

  //usuários podem ser excluídos ou só inativados?
  @Delete(":id")
  @UseGuards(AuthGuard)
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
    @Headers("host") host: string,
    @Headers("user-agent") userAgent: string,
    @Headers("authorization") authorization: string
  ) {

    const [tokenType, tokenValue] = authorization?.split(" ")
    const payload = await JwtProvider.getPayload(tokenValue)
    const user = { email: payload.email, host, userAgent }

    const usecase = new DeleteUser(this.repo, this.auditProvider)
    const result = await usecase.execute(id, user)

    if (result.success) {
      res.status(result?.status ?? 200).json({
        status: result.status,
        message: result.message,
        data: result.data
      })

    } else {
      throw new HttpException(result.message, result.status, { cause: result.errors })
    }

  }

}
