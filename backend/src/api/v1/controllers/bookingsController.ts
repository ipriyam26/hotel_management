import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { createBooking } from "../services/bookings";

export const GetAllBookings = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    message: "GetAllBookings",
  });
};

export const GetBookingById = async (req: Request, res: Response) => {
  const id = req.params.id;

  res.status(StatusCodes.OK).json({
    message: `GetBookingById ${id}`,
  });
};

export const CreateBooking = async (req: Request, res: Response) => {
  createBooking(req, res);
};

export const UpdateBooking = async (req: Request, res: Response) => {
  const id = req.params.id;

  res.status(StatusCodes.OK).json({
    message: `UpdateBooking ${id}`,
  });
};

export const DeleteBooking = async (req: Request, res: Response) => {
  const id = req.params.id;

  res.status(StatusCodes.OK).json({
    message: `DeleteBooking ${id}`,
  });
};
