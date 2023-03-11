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
exports.getBookingService = void 0;
const models_1 = require("../models");
const getBookingService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // find the booking and return it
    // if not found return 404
    try {
        const booking = yield models_1.bookingModel.findById(req.params.id);
        if (!booking) {
            return res.status(404).send({ message: "Booking not found" });
        }
        res.status(200).send(booking);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal server error" });
    }
});
exports.getBookingService = getBookingService;
//# sourceMappingURL=getBookingService.js.map