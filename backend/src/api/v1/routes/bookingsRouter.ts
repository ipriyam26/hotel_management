import express from "express";
import {
  GetAllBookings,
  GetBookingById,
  CreateBooking,
  UpdateBooking,
  DeleteBooking,
} from "../controllers";
const router = express.Router();

router.get("/", GetAllBookings);
router.get("/:id", GetBookingById);
router.post("/", CreateBooking);
router.put("/:id", UpdateBooking);
router.delete("/:id", DeleteBooking);

export default router;
