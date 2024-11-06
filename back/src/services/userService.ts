import { AppDataSource } from "../config/data-source";
import { UserDto, UserLoginDTO, UserRegisterDTO } from "../dto/UserDTO";
import { User } from "../entities/UsersEntity";
import { UserRepository } from "../repositories/UserRepository";
import {
  authCredentialService,
  getCredentialService,
} from "./credentialService";

export const getAllUserService = async (): Promise<User[] | string> => {
  const users: User[] = await UserRepository.find();
  return users;
};

export const getUserByIdService = async (id: number): Promise<User> => {
  const userFound = await UserRepository.validateUser(id);
  return userFound;
};

export const registeUserService = async (
  userData: UserRegisterDTO
): Promise<User | undefined> => {
  const result = await AppDataSource.transaction(async (entityManager) => {
    if (userData.username.length > 2) {
      const credentials = await getCredentialService(
        entityManager,
        userData.username,
        userData.password
      );
      const newUser: User = entityManager.create(User, {
        name: userData.name,
        email: userData.email,
        birthdate: userData.birthdate,
        nDni: userData.nDni,
        credentials,
      });
      await entityManager.save(newUser);
      return newUser;
    } else throw Error("El username debe tener al menos 3 carácteres");
  });

  return result;
};

export const loginUserService = async (
  credentials: UserLoginDTO
): Promise<UserDto> => {
  const idValidated = await authCredentialService(
    credentials.username,
    credentials.password
  );
  const userFound: User | null = await UserRepository.findOneBy({
    id: idValidated,
  });
  return {
    id: userFound?.id ?? 0,
    name: userFound?.name ?? "",
    email: userFound?.email ?? "",
  };
};
