import { Response } from 'express';
import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Put, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AddPermissionToProfile, AddPermissionToUser, CreatePermission, DeletePermission, FindPermission, PermissionProfileProps, PermissionProps, PermissionUserProps, RemovePermissionFromProfile, RemovePermissionFromUser, TogglePermission, UpdatePermission } from "@repo/core"
import { AuditPrisma } from 'src/providers/audit.prisma';
import { PermissionPrisma } from 'src/providers/permission.prisma';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtProvider } from 'src/providers/jwt.provider';
import { CustomFilter } from 'src/errors/custom/custom.filter';


@Controller('permission')
@UseGuards(AuthGuard)
@UseFilters(CustomFilter)
export class PermissionController {

  constructor(
    private readonly repo: PermissionPrisma,
    private readonly auditProvider: AuditPrisma
  ) { }

  @Post()
  async create(
    @Body() data: PermissionProps,
    @Res() res: Response,
    @Headers("host") host: string,
    @Headers("user-agent") userAgent: string,
    @Headers("authorization") authorization: string
  ) {

    const [tokenType, tokenValue] = authorization?.split(" ")
    const payload = await JwtProvider.getPayload(tokenValue)
    const user = { email: payload.email, host, userAgent }

    const usecase = new CreatePermission(this.repo, this.auditProvider)
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

    const usecase = new FindPermission(this.repo, this.auditProvider)
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

    const usecase = new FindPermission(this.repo, this.auditProvider)
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
    @Body() data: PermissionProps,
    @Res() res: Response,
    @Headers("host") host: string,
    @Headers("user-agent") userAgent: string,
    @Headers("authorization") authorization: string
  ) {

    const [tokenType, tokenValue] = authorization?.split(" ")
    const payload = await JwtProvider.getPayload(tokenValue)
    const user = { email: payload.email, host, userAgent }

    const usecase = new UpdatePermission(this.repo, this.auditProvider)
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

    const usecase = new TogglePermission(this.repo, this.auditProvider)
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

    const usecase = new DeletePermission(this.repo, this.auditProvider)
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

  }//delete

  @Post("addToProfile")
  async addToProfile(
    @Body() data: PermissionProfileProps,
    @Res() res: Response,
    @Headers("host") host: string,
    @Headers("user-agent") userAgent: string,
    @Headers("authorization") authorization: string
  ) {

    const [tokenType, tokenValue] = authorization?.split(" ")
    const payload = await JwtProvider.getPayload(tokenValue)
    const user = { email: payload.email, host, userAgent }

    const usecase = new AddPermissionToProfile(this.repo, this.auditProvider)
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
  }//addToProfile

  @Post("removeFromProfile")
  async removeFromProfile(
    @Body() data: PermissionProfileProps,
    @Res() res: Response,
    @Headers("host") host: string,
    @Headers("user-agent") userAgent: string,
    @Headers("authorization") authorization: string
  ) {

    const [tokenType, tokenValue] = authorization?.split(" ")
    const payload = await JwtProvider.getPayload(tokenValue)
    const user = { email: payload.email, host, userAgent }

    const usecase = new RemovePermissionFromProfile(this.repo, this.auditProvider)
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
  }//removeFromProfile


  @Post("addToUser")
  async addToUser(
    @Body() data: PermissionUserProps,
    @Res() res: Response,
    @Headers("host") host: string,
    @Headers("user-agent") userAgent: string,
    @Headers("authorization") authorization: string
  ) {

    const [tokenType, tokenValue] = authorization?.split(" ")
    const payload = await JwtProvider.getPayload(tokenValue)
    const user = { email: payload.email, host, userAgent }

    const usecase = new AddPermissionToUser(this.repo, this.auditProvider)
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
  }//addToUser

  @Post("removeFromUser")
  async removeFromUser(
    @Body() data: PermissionUserProps,
    @Res() res: Response,
    @Headers("host") host: string,
    @Headers("user-agent") userAgent: string,
    @Headers("authorization") authorization: string
  ) {

    const [tokenType, tokenValue] = authorization?.split(" ")
    const payload = await JwtProvider.getPayload(tokenValue)
    const user = { email: payload.email, host, userAgent }

    const usecase = new RemovePermissionFromUser(this.repo, this.auditProvider)
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
  }//removeFromUser

}
