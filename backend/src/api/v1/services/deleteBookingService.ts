import { bookingModel } from "../models";
import { Request, Response } from "express";

export const deleteBooking = async (req: Request, res: Response) => {
    const { id } = req.params;
    const bookingId = id;

  try {
    const booking = await bookingModel.findById(bookingId).populate("room");

    if (!booking) {
      return res.status(404).send({ message: "Booking not found" });
    }

    // Check if booking is in the past
    if (booking.startTime < new Date()) {
      return res.status(400).send({ message: "Cannot delete past bookings" });
    }

    const now = new Date();
    const start = new Date(booking.startTime);

    const refundPercent =
      start.getTime() - now.getTime() > 48 * 60 * 60 * 1000
        ? 100
        : start.getTime() - now.getTime() > 24 * 60 * 60 * 1000
        ? 50
        : 0;

    const refundAmount = (refundPercent / 100) * booking.price;

    await bookingModel.findByIdAndDelete(bookingId);

    res.status(200).send({
      message: "Booking deleted successfully",
      refundPercent,
      refundAmount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};
