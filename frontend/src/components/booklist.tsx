import { useEffect, useState } from "react";
import { bookings } from "../App";

const today = new Date();
const currentTime = today.getTime();
interface Props {
    roomNumbers: string[],
    bookings: bookings[]
}

const BookingList = ({ roomNumbers, bookings }: Props): JSX.Element => {
    const [occupiedRooms, setOccupiedRooms] = useState<String[]>([]);
    // const [freeRooms, setFreeRooms] = useState<String[]>([]);

    useEffect(() => {
        const occupied = [];
        const free = [];

        for (let i = 0; i < roomNumbers.length; i++) {
            const room = roomNumbers[i];
            let isOccupied = false;

            for (let j = 0; j < bookings.length; j++) {
                const booking = bookings[j];

                if (booking.roomNumber === room) {
                    const start = new Date(booking.startTime).getTime();
                    const end = new Date(booking.endTime).getTime();

                    if (start <= currentTime && currentTime <= end) {
                        occupied.push(room);
                        isOccupied = true;
                        break;
                    }
                }
            }

            if (!isOccupied) {
                free.push(room);
            }
        }

        setOccupiedRooms(occupied);
        // setFreeRooms(free);
    }, [roomNumbers, bookings]);

    return (
        <div className="bg-gray-900 rounded-lg p-3 my-4">
            <h3 className="text-lg font-sans text-white">
                Current Occupancy
            </h3>
            <div className="flex justify-center ">
            
                <div className="grid grid-cols-6 gap-2">
                    {roomNumbers.map((room) => (
                        <div
                            key={room}
                            className={`col-span-2 w-24  flex items-center justify-center rounded-xs font-bold text-white ${occupiedRooms.includes(room) ? "bg-red-500" : "bg-green-600"
                                }`}
                        >
                            {room}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookingList;