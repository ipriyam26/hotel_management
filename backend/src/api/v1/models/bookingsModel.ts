import  mongoose, {  Schema } from 'mongoose';
import { BookingDocument, BookingModel } from '../interfaces';


  // Define the schema for the Booking collection
   const bookingSchema = new Schema<BookingDocument, BookingModel>({
    email: { type: String, required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    price: { type: Number, required: true, min: 0 },
  });

  export const bookingModel = mongoose.model<BookingDocument, BookingModel>('Booking', bookingSchema);