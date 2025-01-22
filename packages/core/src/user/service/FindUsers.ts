import { AuditRepository } from '../../audit';
import { SaveAudit } from '../../audit/service/SaveAudit';
import { CoreResponse } from '../../common/CoreResponse';
import { UseCase } from '../../common/UseCase'
import { PermissionRepository } from '../../permission';
import { UserProps } from '../model/UserProps';
import { UserRepository } from '../provider/UserRepository';

export class FindUsers implements UseCase<string | null, CoreResponse> {

  private readonly auditSave: SaveAudit

  constructor(
    private readonly repo: UserRepository,
    private readonly auditRepo: AuditRepository,
    private readonly permissionRepo: PermissionRepository
  ) {
    this.auditSave = new SaveAudit(this.auditRepo)
  }

  // Não deve ser possível executar sem usuário logado!
  async execute(id?: string, user?: UserProps, withPassword: boolean = false): Promise<CoreResponse> {


    if (user && user.email) {

      //usuário precisa ser informado para este caso de uso
      if (user.email) {

        const host = user?.host
        const userAgent = user?.userAgent
        const userDB = await this.repo.findByEmail(user.email)

        //usuário não encontrado
        if (!userDB) {
          return {
            success: false,
            status: 400,
            message: "Usuário não encontrado com e-mail " + user.email,
            data: { id, user }
          }
        }

        //valida se 'usuario' tem permissão para executar esse caso de uso
        const userHasPermission = await this.permissionRepo.userHasPermission(userDB.id.toString(), "FIND_USER")

        if (!userHasPermission) {
          return {
            success: false,
            status: 400,
            message: "O usuário não tem permissão para procurar usuários",
          }
        }

        if (id) {
          return await this.findById(id, { ...userDB, host: host, userAgent: userAgent }, withPassword)
        } else {
          return await this.findAll({ ...userDB, host: host, userAgent: userAgent }, withPassword)
        }

      }

    } else {
      //usuário não informado - logar e retornar com erro
      await this.auditSave.execute({
        moduleName: "USER",
        useCase: "FindUser",
        message: "Erro de validação",
        responseData: JSON.stringify("Usuário inválido: e-mail não informado"),
        requestData: JSON.stringify({ id, user }),
        host: user?.host,
        userAgent: user?.userAgent
      })

      return {
        success: false,
        status: 400,
        message: "E-mail não informado",
        data: { id, user }
      }
    }

  } //execute



  private async findById(id: string, user: UserProps, withPassword: boolean): Promise<CoreResponse> {

    const result = await this.repo.findById(id, withPassword)

    if (result) {

      await this.auditSave.execute({
        moduleName: "USER",
        useCase: "FindUser.findById",
        message: "Consulta usuário",
        userId: user.id,
        requestData: JSON.stringify({ id }),
        responseData: JSON.stringify({ user: result }),
        host: user?.host,
        userAgent: user?.userAgent
      })

      return {
        success: true,
        status: 200,
        data: result
      }

    } else {

      await this.auditSave.execute({
        moduleName: "USER",
        useCase: "FindUser.findById",
        message: "Erro de validação",
        userId: user.id,
        requestData: JSON.stringify({ id }),
        responseData: JSON.stringify("Usuário não encontrado"),
        host: user?.host,
        userAgent: user?.userAgent
      })

      return {
        success: false,
        status: 400,
        message: "Usuário não encontrado",
        data: result
      }
    }

  } //findById


  private async findAll(user: UserProps, withPassword: boolean): Promise<CoreResponse> {

    const result = await this.repo.findAll(withPassword)

    if (result.length > 0) {

      await this.auditSave.execute({
        moduleName: "USER",
        useCase: "FindUser.findAll",
        message: "Consulta todos usuários",
        userId: user.id,
        responseData: JSON.stringify("Result omitted."),
        host: user?.host,
        userAgent: user?.userAgent
      })

      return {
        success: true,
        status: 200,
        data: result
      }

    } else {

      await this.auditSave.execute({
        moduleName: "USER",
        useCase: "FindUser.findAll",
        message: "Nenhum usuário encontrado",
        userId: user.id,
        responseData: JSON.stringify("Result omitted."),
        host: user?.host,
        userAgent: user?.userAgent
      })

      return {
        success: false,
        status: 400,
        message: "Nenhum usuário encontrado",
        data: result
      }
    }

  } //findAll




}