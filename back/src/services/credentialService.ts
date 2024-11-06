import { EntityManager } from "typeorm";
import { Credentials } from "../entities/Credentials";
import CustomError from "../utils/customError";
import { CredentialsRepository } from "../repositories/CredentialsRepository";

export const getCredentialService = async (
  entityManager: EntityManager,
  username: string,
  password: string
): Promise<Credentials> => {
  const validUsername: Credentials | null =
    await CredentialsRepository.findOneBy({
      username,
    });
  //* Encriptación de la contraseña
  const hashedPassword: string =
    await CredentialsRepository.encryptPassword(password);

  //* Validación para evitar username repetidos
  if (!validUsername) {
    const newCredentals: Credentials = entityManager.create(Credentials, {
      username,
      password: hashedPassword,
    });
    const result = await entityManager.save(newCredentals);
    return result;
  } else throw new CustomError(400, "Username already exists");
};

export const authCredentialService = async (
  username: string,
  password: string
): Promise<number | undefined> => {
  const credentials = await CredentialsRepository.findOne({
    where: { username },
  });
  if (!credentials) throw Error("Invalid username or password");
  const passwordChecked = await CredentialsRepository.validatePassword(
    password,
    credentials.password
  );
  if (passwordChecked) return credentials.id;
  else throw new CustomError(400, "Invalid username or password");
};
