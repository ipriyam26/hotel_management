export interface RoomType {
  _id: string;
  name: string;
  hourlyRate: number;
  __v: number;
}

export interface Room {
  _id: string;
  number: string;
  type: string;
  __v: number;
}

export interface AllRoomsResponse {
  rooms: Room[];
  roomTypes: RoomType[];
}



export interface Booking {
  _id: string;
  email: string;
  room: {
    _id: string;
    number: string;
    type: string;
    __v: number;
  };
  startTime: string;
  endTime: string;
  price: number;
  __v: number;
}

export interface RoomTypeRes {
  [key: string]: Booking[];
}

export interface BookingsByRoomType {
  [key: string]: RoomType;
}

export interface ApiResponse {
  bookingsByRoomType: BookingsByRoomType;
}


export interface createBookingResponse {
  message: string;
  booking: CreateBooking;
}
export interface CreateBooking {
  email: string;
  room: string;
  startTime: string;
  endTime: string;
  price?: number;
  _id?: string;
  __v?: number;
}