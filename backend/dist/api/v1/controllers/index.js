"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRoomsAndTypes = exports.GetRoomTypeAvailability = exports.GetRoomAvailability = exports.DeleteBooking = exports.UpdateBooking = exports.CreateBooking = exports.GetBookingById = exports.GetAllBookings = void 0;
const bookingsController_1 = require("./bookingsController");
Object.defineProperty(exports, "GetAllBookings", { enumerable: true, get: function () { return bookingsController_1.GetAllBookings; } });
Object.defineProperty(exports, "GetBookingById", { enumerable: true, get: function () { return bookingsController_1.GetBookingById; } });
Object.defineProperty(exports, "CreateBooking", { enumerable: true, get: function () { return bookingsController_1.CreateBooking; } });
Object.defineProperty(exports, "UpdateBooking", { enumerable: true, get: function () { return bookingsController_1.UpdateBooking; } });
Object.defineProperty(exports, "DeleteBooking", { enumerable: true, get: function () { return bookingsController_1.DeleteBooking; } });
const roomController_1 = require("./roomController");
Object.defineProperty(exports, "GetRoomAvailability", { enumerable: true, get: function () { return roomController_1.GetRoomAvailability; } });
Object.defineProperty(exports, "GetRoomTypeAvailability", { enumerable: true, get: function () { return roomController_1.GetRoomTypeAvailability; } });
Object.defineProperty(exports, "GetRoomsAndTypes", { enumerable: true, get: function () { return roomController_1.GetRoomsAndTypes; } });
//# sourceMappingURL=index.js.map