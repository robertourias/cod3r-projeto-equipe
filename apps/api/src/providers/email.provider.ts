import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';
import { SendEmailProvider } from '@repo/core';

@Injectable()
export class EmailProvider implements SendEmailProvider {
    constructor(private readonly SendGrid: SendGridService){}
    
    async sendEmailRecovery(email:string, token:string):Promise<void>{
      await this.SendGrid.send({
        to: email,
        from: process.env.FROM_EMAIL,
        subject: "Redefinição de senha",
        html: `Acesse o link para redefinir sua senha: http://localhost:3333/users/recuperar-senha/?email=${email}.com&token=${token}`,
      }) 
 }
    async sendEmail2FA(email:string, token:string):Promise<void>{
      await this.SendGrid.send({
        to: email,
        from: process.env.FROM_EMAIL,
        subject: "CÓDIGO DE ACESSO PROJETO COD3R",
        html: `SEU CÓDIGO DE ACESSO PARA O PROJETO COD3R: ${token}`,
      }) 
 }
}
