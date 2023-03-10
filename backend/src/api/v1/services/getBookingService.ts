import { Request, Response } from "express";
import { BookingDocument } from "../interfaces";
import { bookingModel } from "../models";

export const getBookingService = async (req:Request, res: Response) => {
  // find the booking and return it
  // if not found return 404
  try {
    const booking:BookingDocument = await bookingModel.findById(req.params.id);
    if (!booking) {
      return res.status(404).send({ message: "Booking not found" });
    }
    res.status(200).send(booking);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};
