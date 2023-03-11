"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBookings = void 0;
const models_1 = require("../models");
const room_1 = require("./room");
const getAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allBookings = yield models_1.bookingModel.find().populate('room');
    const bookingsByRoom = {};
    allBookings.forEach((booking) => {
        const roomId = booking.room._id.toString();
        if (bookingsByRoom[roomId]) {
            bookingsByRoom[roomId].push(booking);
        }
        else {
            bookingsByRoom[roomId] = [booking];
        }
    });
    const bookingsByRoomType = {};
    room_1.roomTypes.forEach((roomType) => {
        const roomIds = room_1.rooms.filter((room) => room.type.toString() === roomType._id.toString()).map((room) => room._id.toString());
        bookingsByRoomType[roomType._id.toString()] = {};
        roomIds.forEach((roomId) => {
            bookingsByRoomType[roomType._id.toString()][roomId] = bookingsByRoom[roomId] ? bookingsByRoom[roomId].sort((a, b) => a.startTime.getTime() - b.startTime.getTime()) : [];
        });
    });
    res.status(200).send({ bookingsByRoomType });
});
exports.getAllBookings = getAllBookings;
//# sourceMappingURL=getAllBookingService.js.map