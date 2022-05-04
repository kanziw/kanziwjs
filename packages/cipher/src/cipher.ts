export interface Cipher {
  encrypt(plainText: string): string;
  decrypt(encryptedText: string): string;
}
