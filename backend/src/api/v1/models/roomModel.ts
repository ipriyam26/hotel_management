import mongoose, {  Schema } from 'mongoose';
import { RoomDocument,RoomTypeDocument,RoomTypeModel,RoomModel } from '../interfaces';

  // Define the schema for the RoomType collection
   const roomTypeSchema = new Schema<RoomTypeDocument, RoomTypeModel>({
    name: { type: String, required: true, unique: true },
    hourlyRate: { type: Number, required: true, min: 0 },
  });
  

  // Define the schema for the Room collection
   const roomSchema = new Schema<RoomDocument, RoomModel>({
    number: { type: String, required: true, unique: true },
    type: { type: Schema.Types.ObjectId, ref: 'RoomType', required: true },
  });
  
  export const roomTypeModel = mongoose.model<RoomTypeDocument, RoomTypeModel>('RoomType', roomTypeSchema);

  export const roomModel = mongoose.model<RoomDocument, RoomModel>('Room', roomSchema);
  