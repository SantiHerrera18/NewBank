import { AppDataSource } from "../config/data-source";
import { Credentials } from "../entities/Credentials";
import bcrypt from "bcrypt";

export const CredentialsRepository = AppDataSource.getRepository(
  Credentials
).extend({
  encryptPassword: async function (password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 5);
    return hashedPassword;
  },
  validatePassword: async function (
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  },
});
