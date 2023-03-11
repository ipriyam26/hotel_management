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
exports.DeleteBooking = exports.UpdateBooking = exports.CreateBooking = exports.GetBookingById = exports.GetAllBookings = void 0;
const services_1 = require("../services");
const GetAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, services_1.getAllBookings)(req, res);
});
exports.GetAllBookings = GetAllBookings;
const GetBookingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const id = req.params.id;
    (0, services_1.getBookingService)(req, res);
});
exports.GetBookingById = GetBookingById;
const CreateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, services_1.createBooking)(req, res);
});
exports.CreateBooking = CreateBooking;
const UpdateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, services_1.updateBooking)(req, res);
});
exports.UpdateBooking = UpdateBooking;
const DeleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, services_1.deleteBooking)(req, res);
});
exports.DeleteBooking = DeleteBooking;
//# sourceMappingURL=bookingsController.js.map