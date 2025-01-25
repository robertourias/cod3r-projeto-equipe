//import { GenerateToken, VerifyToken } from "../../../dist";
import { AuditRepository } from "../../audit";
import { SaveAudit } from "../../audit/service/SaveAudit";
import { CoreResponse } from "../../common/CoreResponse";
import { UseCase } from "../../common/UseCase";
import { VerifyToken } from "../../common/VerifyToken";
import { CryptoProvider, TokenProvider, UserProps, UserRepository } from "../../user";
import { LoginProps } from "../model/LoginProps";

export class LoginUser implements UseCase<LoginProps, CoreResponse> {

  private readonly auditSave: SaveAudit

  constructor(
    private readonly repo: UserRepository,
    private readonly crypto: CryptoProvider,
    private readonly tokenProvider: TokenProvider,
    private readonly auditRepo: AuditRepository
  ) {
    this.auditSave = new SaveAudit(this.auditRepo)
  }

  async execute(data: LoginProps, user?: UserProps): Promise<CoreResponse> {

    //procurar usuario no BD pelo email com senha
    const userExist = await this.repo.findByEmail(data.email, true)

    if (userExist) {
      //comparar senhas
      const senhaIgual = await this.crypto.compare(userExist.password, data.password)
      
      if (senhaIgual) {
        //verifica se o usuário possui o 2FA ativo e se o token já foi informado
        if(userExist.twoFactorAuth){
          if(!data.token){
            // const usecase = new GenerateToken(this.repo);
            // await usecase.execute(email)
            
            const email = data?.email
            const password = data.password
            return {
              success: true,
              data: {
                twoFactorAuth: true,
                status: "pending",
                user: {email, password}
              }
            }
          }
          const verifyToken = new VerifyToken(this.repo)
          const token = await verifyToken.execute(data);
          if(!token){
            throw new Error("Token inválido");
          }
        }
        //gerar jwt
        const token = await this.tokenProvider.signIn({ name: userExist.name, email: userExist.email })

        //exclui a senha do retorno
        delete userExist.password

        await this.auditSave.execute({
          moduleName: "AUTH",
          useCase: "LoginUser",
          message: "Login com sucesso.",
          responseData: JSON.stringify({ ...userExist }),
          host: user.host,
          userAgent: user.userAgent
        })

        return {
          success: true,
          data: {
            token,
            user: userExist
          }
        }

      } else {
        this.auditSave.execute({
          moduleName: "AUTH",
          useCase: "LoginUser",
          message: "Erro no login: Usuário ou senha incorretos",
          requestData: JSON.stringify({ ...data, password: undefined }),
          host: user.host,
          userAgent: user.userAgent
        })
        throw new Error("Usuário ou senha incorretos.")
      }

    } else {
      this.auditSave.execute({
        moduleName: "AUTH",
        useCase: "LoginUser",
        message: "Erro no login: Usuário não encontrado",
        requestData: JSON.stringify({ ...data, password: undefined }),
        host: user.host,
        userAgent: user.userAgent
      })
      throw new Error("Usuário não encontrado.")
    }


  }
}