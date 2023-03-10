import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { createBooking, deleteBooking, getAllBookings, getBookingService, updateBooking } from "../services";
import { rooms } from "../services/room";
import { BookingRequest } from "../interfaces";



export const GetAllBookings = async (req: Request, res: Response) => {
  getAllBookings(req, res);
};

export const GetBookingById = async (req: Request, res: Response) => {
  // const id = req.params.id;
  getBookingService(req, res);
};

export const CreateBooking = async (req: Request, res: Response) => {
  createBooking(req, res);
};

export const UpdateBooking = async (req:  Request<{ id: string }, {}, BookingRequest>, res: Response) => {
 updateBooking(req, res);
};

export const DeleteBooking = async (req: Request, res: Response) => {

  deleteBooking(req, res);

};
