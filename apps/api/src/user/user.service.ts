import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private readonly SendGrid: SendGridService){}
    
    async sendEmail(email:string, token:string):Promise<void>{
    await this.SendGrid.send({
      to: email,
      from: process.env.FROM_EMAIL,
      subject: "Redefinição de senha",
      html: `Acesse o link para redefinir sua senha: http://localhost:3333/users/recuperar-senha/?email=${email}.com&token=${token}`,
    }) 
 }
}
