import { RoomDocument, RoomTypeDocument } from "../interfaces";
import { roomModel, roomTypeModel } from "../models";

export let rooms : RoomDocument[] = [];
export let roomTypes : RoomTypeDocument[] = [];
export const getRoomsAndTypes =async () => {
    const roomsLocal = await roomModel.find().exec() as RoomDocument[] ;
    const roomTypesLocal = await roomTypeModel.find().exec() as RoomTypeDocument[];
    rooms = roomsLocal;
    roomTypes = roomTypesLocal;
    return {rooms,roomTypes};
}