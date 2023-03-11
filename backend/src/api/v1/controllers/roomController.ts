import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { rooms, roomTypes } from "../services";

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

export const GetRoomsAndTypes = async (req: Request, res: Response) => {
  const response = {
    rooms: rooms,
    roomTypes: roomTypes,
  };
  res.status(StatusCodes.OK).json(response);
};
