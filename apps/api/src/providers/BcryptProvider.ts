/* 'import bcrypt from 'bcrypt'' gera erro: hash is undefined */
const bcrypt = require('bcrypt');

import { CryptoProvider } from "@repo/core";

export class BcryptProvider implements CryptoProvider {

  async encrypt(password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
  }

  async compare(hash1: string, password: string): Promise<boolean> {
    return await bcrypt.compare(password, hash1)
  }

}