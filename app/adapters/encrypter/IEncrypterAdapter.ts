export interface IEncrypterAdapter {
  encrypt(token: string): string;
  decrypt(encryptedToken: string): string | null;
}
