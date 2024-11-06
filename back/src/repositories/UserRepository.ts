import { AppDataSource } from "../config/data-source";
import { User } from "../entities/UsersEntity";
import CustomError from "../utils/customError";

export const UserRepository = AppDataSource.getRepository(User).extend({
  validateUser: async function (id: number) {
    const userFound = await UserRepository.findOne({
      where: { id },
      relations: ["appointments"],
    });
    if (!userFound)
      throw new CustomError(404, `User with id ${id} doesn't exist`);
    else return userFound;
  },
});
