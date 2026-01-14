import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const ALGORITHM = "aes-256-cbc";
const SECRET_KEY = process.env.TOKEN_SECRET_KEY || "default-secret-key-32-chars-long!!";
const IV_LENGTH = 16;

function getKey(): Buffer {
  // Garantir que a chave tenha 32 bytes (256 bits)
  const key = Buffer.from(SECRET_KEY.padEnd(32, "0").slice(0, 32), "utf-8");
  return key;
}

export function encryptToken(token: string): string {
  const key = getKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(token, "utf8", "hex");
  encrypted += cipher.final("hex");
  
  // Retornar IV + token criptografado (em base64 para facilitar armazenamento em cookie)
  const combined = iv.toString("hex") + ":" + encrypted;
  return Buffer.from(combined).toString("base64");
}

export function decryptToken(encryptedToken: string): string | null {
  try {
    const key = getKey();
    // Decodificar base64 para obter a string UTF-8 original (que contém hex)
    const combined = Buffer.from(encryptedToken, "base64").toString("utf8");
    const [ivHex, encrypted] = combined.split(":");
    
    if (!ivHex || !encrypted) {
      return null;
    }
    
    const iv = Buffer.from(ivHex, "hex");
    const decipher = createDecipheriv(ALGORITHM, key, iv);
    
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    
    return decrypted;
  } catch (error) {
    return null;
  }
}
