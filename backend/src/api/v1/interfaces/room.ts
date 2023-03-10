import { Model,Document } from "mongoose";

// Define the RoomType interface
export interface RoomType {
    name: string;
    hourlyRate: number;
  }
  
  // Define the RoomTypeDocument interface, which extends the RoomType interface and the Document interface from Mongoose
  export interface RoomTypeDocument extends RoomType, Document {}
  
  // Define the RoomTypeModel interface, which extends the Model interface from Mongoose and specifies the generic type parameter to be RoomTypeDocument
  export interface RoomTypeModel extends Model<RoomTypeDocument> {}

  export interface Room {
    number: string;
    type: RoomTypeDocument['_id'];
  }
  
    // Define the RoomDocument interface, which extends the Room interface and the Document interface from Mongoose
    export interface RoomDocument extends Room, Document {}
  
    // Define the RoomModel interface, which extends the Model interface from Mongoose and specifies the generic type parameter to be RoomDocument
    export interface RoomModel extends Model<RoomDocument> {}