import { Document, Model } from 'mongoose';
import { RoomDocument } from '../interfaces';

export interface Booking {
    email: string;
    room: RoomDocument['_id'];
    startTime: Date;
    endTime: Date;
    price: number;
  }
  
  // Define the BookingDocument interface, which extends the Booking interface and the Document interface from Mongoose
  export interface BookingDocument extends Booking, Document {}
  
  // Define the BookingModel interface, which extends the Model interface from Mongoose and specifies the generic type parameter to be BookingDocument
  export interface BookingModel extends Model<BookingDocument> {}
  