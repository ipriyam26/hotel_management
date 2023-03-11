"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
// get available time slots for a room
router.get('/:id/availability', controllers_1.GetRoomAvailability);
// get available time slots for a room of a type
router.get('/types/:roomTypeId/availability', controllers_1.GetRoomTypeAvailability);
router.get('/allrooms', controllers_1.GetRoomsAndTypes);
exports.default = router;
//# sourceMappingURL=roomRouter.js.map