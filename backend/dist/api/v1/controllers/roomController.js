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
exports.GetRoomsAndTypes = exports.GetRoomTypeAvailability = exports.GetRoomAvailability = void 0;
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("../services");
const GetRoomAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: `GetRoomAvailability ${id}`,
    });
});
exports.GetRoomAvailability = GetRoomAvailability;
const GetRoomTypeAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.roomTypeId;
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: `GetRoomTypeAvailability ${id}`,
    });
});
exports.GetRoomTypeAvailability = GetRoomTypeAvailability;
const GetRoomsAndTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = {
        rooms: services_1.rooms,
        roomTypes: services_1.roomTypes,
    };
    res.status(http_status_codes_1.StatusCodes.OK).json(response);
});
exports.GetRoomsAndTypes = GetRoomsAndTypes;
//# sourceMappingURL=roomController.js.map