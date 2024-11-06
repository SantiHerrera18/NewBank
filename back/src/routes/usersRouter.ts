import { NextFunction, Request, Response, Router } from "express";
import { UserLoginDTO, UserRegisterDTO } from "../dto/UserDTO";
import usersController from "../controllers/usersController";

const usersRouter: Router = Router();

usersRouter.get("/", (req: Request, res: Response, next: NextFunction) =>
  usersController.getUsersController(req, res, next)
);

usersRouter.get(
  "/:id",
  (req: Request<{ id: string }>, res: Response, next: NextFunction) =>
    usersController.getUsersControllerById(req, res, next)
);

usersRouter.post(
  "/register",
  (
    req: Request<unknown, unknown, UserRegisterDTO>,
    res: Response,
    next: NextFunction
  ) => usersController.registerUserController(req, res, next)
);

usersRouter.post(
  "/login",
  (
    req: Request<unknown, unknown, UserLoginDTO>,
    res: Response,
    next: NextFunction
  ) => usersController.loginUserController(req, res, next)
);

export default usersRouter;
