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
exports.createBooking = void 0;
const models_1 = require("../models");
const models_2 = require("../models");
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const rrm = yield models_2.roomModel.findById(room);
    // Calculate the price based on the selected room type and booking duration
    const roomDoc = models_1.roomTypeModel.findById(rrm === null || rrm === void 0 ? void 0 : rrm.type);
    const hourlyRate = (yield roomDoc).hourlyRate; // Retrieve hourlyRate from room type
    const bookingDuration = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Convert duration to hours
    const price = hourlyRate * bookingDuration;
    // Check if the selected room is available during the requested time period
    const overlappingBookings = yield models_1.bookingModel.find({
        room,
        $or: [
            { startTime: { $lt: startTime }, endTime: { $gt: startTime } },
            { startTime: { $lt: endTime }, endTime: { $gt: endTime } },
            { startTime: { $gte: startTime }, endTime: { $lte: endTime } },
        ],
    });
    if (overlappingBookings.length > 0) {
        return res
            .status(409)
            .send({
            message: "The selected room is not available during the requested time period",
        });
    }
    // Create a new booking document
    const newBooking = new models_1.bookingModel({
        email,
        room,
        startTime,
        endTime,
        price,
    });
    // Save the new booking document to the database
    yield newBooking.save();
    res
        .status(201)
        .send({ message: "Booking created successfully", booking: newBooking });
    //   }
    //   catch (error) {
    //     res.status(500).send({ message: 'An error occurred while creating the booking', error });
    //   }
});
exports.createBooking = createBooking;
//# sourceMappingURL=bookingsService.js.map