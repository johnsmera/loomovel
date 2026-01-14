import { IEncrypterAdapter } from "../IEncrypterAdapter";
import { encryptToken, decryptToken } from "@/app/lib/token-crypto";

export class TokenEncrypterAdapter implements IEncrypterAdapter {
  encrypt(token: string): string {
    return encryptToken(token);
  }

  decrypt(encryptedToken: string): string | null {
    return decryptToken(encryptedToken);
  }
}

export const tokenEncrypterAdapter = new TokenEncrypterAdapter();
