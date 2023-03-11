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
exports.deleteBooking = void 0;
const models_1 = require("../models");
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const bookingId = id;
    try {
        const booking = yield models_1.bookingModel.findById(bookingId).populate("room");
        if (!booking) {
            return res.status(404).send({ message: "Booking not found" });
        }
        // Check if booking is in the past
        if (booking.startTime < new Date()) {
            return res.status(400).send({ message: "Cannot delete past bookings" });
        }
        const now = new Date();
        const start = new Date(booking.startTime);
        const refundPercent = start.getTime() - now.getTime() > 48 * 60 * 60 * 1000
            ? 100
            : start.getTime() - now.getTime() > 24 * 60 * 60 * 1000
                ? 50
                : 0;
        const refundAmount = (refundPercent / 100) * booking.price;
        yield models_1.bookingModel.findByIdAndDelete(bookingId);
        res.status(200).send({
            message: "Booking deleted successfully",
            refundPercent,
            refundAmount,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal server error" });
    }
});
exports.deleteBooking = deleteBooking;
//# sourceMappingURL=deleteBookingService.js.map