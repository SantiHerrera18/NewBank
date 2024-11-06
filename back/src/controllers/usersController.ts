/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { UserLoginDTO, UserRegisterDTO } from "../dto/UserDTO";
import {
  getAllUserService,
  getUserByIdService,
  loginUserService,
  registeUserService,
} from "../services/userService";
import { User } from "../entities/UsersEntity";
import { catchingError } from "../utils/catchingError";

//? Controlador para obtener todos los usuarios
const getUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const result: User[] | string = await getAllUserService();
  res.status(200).json({
    message: "Obtener el listado de todos los usuarios",
    data: result,
  });
};

//? Controlador para búsqueda por ID
const getUsersControllerById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const result = await getUserByIdService(parseInt(id, 10));
  res.status(200).json({
    message: "Obtener el detalle de un usuario específico",
    data: result,
  });
};

//? Controlador para registro de usuario
const registerUserController = async (
  req: Request<unknown, unknown, UserRegisterDTO>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const result = await registeUserService(req.body);
  res.status(200).json({
    message: "Usuario registrado con éxito",
    data: result,
  });
};

//? Controlador para login de usuario
const loginUserController = async (
  req: Request<unknown, unknown, UserLoginDTO>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const result = await loginUserService(req.body);
  res.status(200).json({
    login: true,
    user: result,
  });
};

const usersController = {
  getUsersController: catchingError(getUsersController),
  getUsersControllerById: catchingError(getUsersControllerById),
  registerUserController: catchingError(registerUserController),
  loginUserController: catchingError(loginUserController),
};

export default usersController;
