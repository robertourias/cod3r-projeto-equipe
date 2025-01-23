import { UseCase } from "./UseCase";
import { UserProps, UserRepository } from "../user";


export class GenerateToken implements UseCase<string, UserProps> {
  constructor(
    private readonly repo: UserRepository
  ) { }
  private generate(qtd = 6) {
    const characteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < qtd; i++) {
        const random = Math.floor(Math.random() * characteres.length);
        result += characteres[random];
    }
  
    return result;
  }
  
  private generateExpiration(){
    const now = new Date();
    const newDate = new Date(now);
    newDate.setMinutes(newDate.getMinutes() + 5);
    return newDate.getTime();
  }
  async execute(email: string): Promise<UserProps> {

    const user = await this.repo.findByEmail(email)

    if(!user){
      throw new Error("Usuário não existe")
    }

    const token = this.generate()
    const expiresIn = this.generateExpiration()
    const newUser = await this.repo.save({ ...user, recoveryToken: token, tokenExpiration: expiresIn.toString()})
    return newUser
  }
  
}