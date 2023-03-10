import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const GetRoomAvailability = async (req: Request, res: Response) => {
  const id = req.params.id;

  res.status(StatusCodes.OK).json({
    message: `GetRoomAvailability ${id}`,
  });
};

export const GetRoomTypeAvailability = async (req: Request, res: Response) => {
  const id = req.params.roomTypeId;

  res.status(StatusCodes.OK).json({
    message: `GetRoomTypeAvailability ${id}`,
  });
};
