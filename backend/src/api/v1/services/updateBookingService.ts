import {  BookingRequest } from "../interfaces";
import { bookingModel, roomModel, roomTypeModel } from "../models";
import { Request,Response } from "express";


export const updateBooking = async (req: Request<{id: string}, {}, BookingRequest>, res: Response) => {
  const { id } = req.params;
  let { email:userEmail, room: newRoomId, startTime: newStartTime, endTime: newEndTime } = req.body;
  console.log(req.body);

  try {
    const booking = await bookingModel.findById(id).populate('room');
    if (!booking) {
      return res.status(404).send({ message: `Booking with id ${id} not found` });
    }
    if(booking.startTime < new Date()){
      return res.status(400).send({ message: 'Cannot update booking that has already started' });
    }
    if(!newRoomId){
      newRoomId = booking.room._id;
    }
    // Calculate the new price based on changes in booking duration and room type
    const newRoom = await roomModel.findById(newRoomId);
    const newRoomType = await roomTypeModel.findById(newRoom.type);

    const hourlyRate = newRoomType.hourlyRate; // Retrieve hourlyRate from room type
    const newDuration = (new Date(newEndTime).getTime() - new Date(newStartTime).getTime()) / (1000 * 60 * 60); // Convert duration to hours
    const newPrice = hourlyRate * newDuration;

   if (newStartTime || newEndTime) {

   

    // If the room or start/end time changed, check if there are overlapping bookings
    if (newRoomId !== booking.room._id.toString() || newStartTime !== booking.startTime.toString() || newEndTime !== booking.endTime.toString()) {
      const overlappingBookings = await bookingModel.find({
        room: newRoomId,
        $or: [
          { startTime: { $lt: newStartTime }, endTime: { $gt: newStartTime } },
          { startTime: { $lt: newEndTime }, endTime: { $gt: newEndTime } },
          { startTime: { $gte: newStartTime }, endTime: { $lte: newEndTime } },
        ],
      });

      if (overlappingBookings.length > 0) {
        return res.status(409).send({ message: 'The selected room is not available during the requested time period' });
      }
    }


    booking.startTime = new Date (newStartTime) ;
    booking.endTime = new Date( newEndTime);
  }

    console.log(newEndTime);
    // Update the booking with the new values
    booking.room = newRoomId;
    booking.price = newPrice || booking.price;
    booking.email = userEmail || booking.email;

    // Save the updated booking to the database
    await booking.save();

    res.status(200).send({ message: 'Booking updated successfully', booking });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `An error occurred while updating the booking with id ${id}`, error });
  }
};
