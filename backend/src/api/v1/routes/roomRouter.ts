import express from 'express';
import { GetRoomAvailability, GetRoomTypeAvailability } from '../controllers';
const router = express.Router();


// get available time slots for a room
router.get('/:id/availability',GetRoomAvailability);
// get available time slots for a room of a type
router.get('/types/:roomTypeId/availability',GetRoomTypeAvailability);

export default router;