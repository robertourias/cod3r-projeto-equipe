export interface TokenProvider {
  signIn(payload: any): Promise<string>
}