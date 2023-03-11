import { bookingModel, roomTypeModel } from "../models";
import {
  BookingDocument,
  Booking,
  BookingRequest,
  RoomDocument,
  RoomTypeDocument,
} from "../interfaces";
import { roomModel } from "../models";
import { Request, Response } from "express";
import { roomTypes, rooms } from "./room";

export const createBooking = async (
  req: Request<{}, {}, BookingRequest>,
  res: Response
) => {
  //   try {

  const { email, room, startTime, endTime } = req.body;
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (start.getTime() < Date.now() || end.getTime() < Date.now()) {
    return res
      .status(400)
      .send({ message: "Booking start and end times must be in the future" });
  }
  if (start.getTime() > end.getTime()) {
    return res
      .status(400)
      .send({ message: "Booking end time must be after start time" });
  }

  const rrm = await roomModel.findById(room);

  // Calculate the price based on the selected room type and booking duration
  const roomDoc = roomTypeModel.findById(rrm?.type);
  const hourlyRate = (await roomDoc).hourlyRate; // Retrieve hourlyRate from room type

  const bookingDuration = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Convert duration to hours
  const price = hourlyRate * bookingDuration;

  // Check if the selected room is available during the requested time period
  const overlappingBookings = await bookingModel.find({
    room,
    $or: [
      { startTime: { $lt: startTime }, endTime: { $gt: startTime } },
      { startTime: { $lt: endTime }, endTime: { $gt: endTime } },
      { startTime: { $gte: startTime }, endTime: { $lte: endTime } },
    ],
  });

  if (overlappingBookings.length > 0) {
    return res.status(409).send({
      message:
        "The selected room is not available during the requested time period",
    });
  }

  // Create a new booking document
  const newBooking = new bookingModel({
    email,
    room,
    startTime,
    endTime,
    price,
  });

  // Save the new booking document to the database
  await newBooking.save();

  
  res
    .status(201)
    .send({ message: "Booking created successfully", booking: newBooking });
  //   }
  //   catch (error) {
  //     res.status(500).send({ message: 'An error occurred while creating the booking', error });
  //   }
};
