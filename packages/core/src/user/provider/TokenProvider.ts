export interface TokenProvider {
  signIn(payload: any): Promise<string>
  validate(token: string): Promise<boolean>
  // getPayload(token: string): Promise<any>
}