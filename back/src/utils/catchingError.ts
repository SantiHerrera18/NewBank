import { Request, Response, NextFunction } from "express";

export const catchingError = <Params, ResBody, ReqBody>(
  controller: (
    req: Request<Params, ResBody, ReqBody>,
    res: Response<ResBody>,
    next: NextFunction
  ) => Promise<void>
) => {
  return function (
    req: Request<Params, ResBody, ReqBody>,
    res: Response<ResBody>,
    next: NextFunction
  ) {
    controller(req, res, next).catch((error) => next(error));
  };
};
