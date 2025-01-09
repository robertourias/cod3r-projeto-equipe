export interface SendEmailProvider{
    sendEmailRecovery(email: string, token:string):void
    sendEmail2FA(email: string, token:string):void

}