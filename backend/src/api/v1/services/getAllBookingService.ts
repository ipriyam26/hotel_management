import { BookingDocument } from "../interfaces";
import { bookingModel } from "../models";
import { rooms, roomTypes } from "./room";
import { Request,Response } from "express";
export const getAllBookings = async (req: Request, res:Response) => {


    const allBookings = await bookingModel.find().populate('room');
    const bookingsByRoom: { [roomId: string]: BookingDocument[] } = {};
  
    allBookings.forEach((booking) => {
      const roomId = booking.room._id.toString();
      if (bookingsByRoom[roomId]) {
        bookingsByRoom[roomId].push(booking);
      } else {
        bookingsByRoom[roomId] = [booking];
      }
    });
  
    const bookingsByRoomType: { [roomTypeId: string]: { [roomId: string]: BookingDocument[] } } = {};
  
    roomTypes.forEach((roomType) => {
      const roomIds = rooms.filter((room) => room.type.toString() === roomType._id.toString()).map((room) => room._id.toString());
      bookingsByRoomType[roomType._id.toString()] = {};
      roomIds.forEach((roomId) => {
        bookingsByRoomType[roomType._id.toString()][roomId] = bookingsByRoom[roomId] ? bookingsByRoom[roomId].sort((a, b) => a.startTime.getTime() - b.startTime.getTime()) : [];
      });
    });
  
    res.status(200).send({ bookingsByRoomType });
  };