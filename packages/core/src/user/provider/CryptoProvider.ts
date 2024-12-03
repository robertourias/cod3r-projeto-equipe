export interface CryptoProvider {
  encrypt(password: string): Promise<string>
  compare(hash: string, password: string): Promise<boolean>
}