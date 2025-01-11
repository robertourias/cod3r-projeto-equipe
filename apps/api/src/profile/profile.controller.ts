import { Response } from 'express';
import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Put, Res, UseFilters, UseGuards } from '@nestjs/common';
import { CreateProfile, DeleteProfile, FindProfile, ProfileProps, ToggleProfile, UpdateProfile } from "@repo/core"
import { AuditPrisma } from 'src/providers/audit.prisma';
import { ProfilePrisma } from 'src/providers/profile.prisma';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtProvider } from 'src/providers/jwt.provider';
import { CustomFilter } from 'src/errors/custom/custom.filter';


@Controller('profile')
@UseGuards(AuthGuard)
@UseFilters(CustomFilter)
export class ProfileController {

  constructor(
    private readonly repo: ProfilePrisma,
    private readonly auditProvider: AuditPrisma
  ) { }

  @Post()
  async create(
    @Body() data: ProfileProps,
    @Res() res: Response,
    @Headers("host") host: string,
    @Headers("user-agent") userAgent: string,
    @Headers("authorization") authorization: string
  ) {

    const [tokenType, tokenValue] = authorization?.split(" ")
    const payload = await JwtProvider.getPayload(tokenValue)
    const user = { email: payload.email, host, userAgent }

    const usecase = new CreateProfile(this.repo, this.auditProvider)
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
  }//create


  @Get()
  async findAll(
    @Res() res: Response,
    @Headers("host") host: string,
    @Headers("user-agent") userAgent: string,
    @Headers("authorization") authorization: string
  ) {

    const [tokenType, tokenValue] = authorization?.split(" ")
    const payload = await JwtProvider.getPayload(tokenValue)
    const user = { email: payload.email, host, userAgent }

    const usecase = new FindProfile(this.repo, this.auditProvider)
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
  }//findAll


  @Get(":id")
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

    const usecase = new FindProfile(this.repo, this.auditProvider)
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
  }//findOne


  @Put()
  async update(
    @Body() data: ProfileProps,
    @Res() res: Response,
    @Headers("host") host: string,
    @Headers("user-agent") userAgent: string,
    @Headers("authorization") authorization: string
  ) {

    const [tokenType, tokenValue] = authorization?.split(" ")
    const payload = await JwtProvider.getPayload(tokenValue)
    const user = { email: payload.email, host, userAgent }

    const usecase = new UpdateProfile(this.repo, this.auditProvider)
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

  }//update



  @Post("toggle/:id")
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

    const usecase = new ToggleProfile(this.repo, this.auditProvider)
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


  @Delete(":id")
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

    const usecase = new DeleteProfile(this.repo, this.auditProvider)
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
