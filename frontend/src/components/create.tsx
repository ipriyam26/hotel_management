import React from 'react'
import { API_URL } from '../constants';
import { AllRoomsResponse, Booking, BookingUpdate, createBookingResponse } from '../types';
import TimePicker from './timepicker';

type Props = {
    model: Booking;
    setModel: React.Dispatch<React.SetStateAction<Booking>>;
    setAddingNewBooking: React.Dispatch<React.SetStateAction<boolean>>;
    addingNewBooking: boolean;
    bookings: Booking[];
    allRooms: AllRoomsResponse;
    setAllBookings: React.Dispatch<React.SetStateAction<Booking[]>>;

}

function UpdateCreate({ setModel, model, setAddingNewBooking, addingNewBooking, allRooms, bookings, setAllBookings }: Props) {


    const createBooking = async (): Promise<createBookingResponse> => {

        // from room number get room id
        const room = allRooms?.rooms.find(room => room.number === model.room.number)?._id!;
        const booking = {
            email: model.email,
            room: room,
            startTime: model.startTime,
            endTime: model.endTime,
        };
        console.log(booking);
        const response = await fetch(`${API_URL}/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(booking),
        });

        const res: createBookingResponse = await response.json();
        console.log(res);
        return res;
    };

    const dummyBookings: Booking = {
        "_id": "",
        "email": "",
        "room": {
            "_id": "",
            "number": "",
            "type": "",
            "__v": 0
        },
        "startTime": new Date().toISOString(),
        "endTime": new Date().toISOString(),
        "price": 0,
        "__v": 0
    }
    type deleteBookingResponse = {
        message: string;
        refundPercent: number;
        refundAmount: number;
    }



    const handleDelete = async (bookingId: string) => {
        const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
            method: "DELETE",
        });
        const res: deleteBookingResponse = await response.json();

        if (res.message !== "Booking deleted successfully") {
            alert("Something went wrong");
            return;
        }
        alert(`Booking deleted successfully. Refund amount: ${res.refundAmount}. Refund percentage: ${res.refundPercent}%`);

        const newBookings = bookings.filter(booking => booking._id !== bookingId);
        setAllBookings(newBookings);
        setModel(dummyBookings);
    }

    const handleNewBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("new booking");
        const res = await createBooking();
        // search room.number in allRooms.room and get type

        // from this res lets make a new booking object and add it to the bookings array
        const newBooking: Booking = {
            "_id": res.booking._id!,
            "email": res.booking.email,
            "room": {
                "_id": model.room._id,
                "number": model.room.number,
                "type": model.room.type,
                "__v": 0
            },
            "startTime": res.booking.startTime,
            "endTime": res.booking.endTime,
            "price": res.booking.price!,
            "__v": 0
        }
        setAllBookings([...bookings, newBooking]);

        setAddingNewBooking(false);
        setModel(
            dummyBookings
        )
    }

    const updateBooking = async (): Promise<createBookingResponse> => {
        const bookingId = model._id;
        const room = allRooms?.rooms.find(room => room.number === model.room.number)?._id!;

        const bookingData: BookingUpdate = {
            email: model.email,
            startTime: model.startTime,
            endTime: model.endTime,
            room: room,
        }
        const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });
        const res: createBookingResponse = await response.json();
        return res;
    }
    const handleUpdateBooking = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("update booking");
        updateBooking();
        // remove old booking from bookings array and add new booking
        const newBookings = bookings.filter(booking => booking._id !== model._id);
        setAllBookings([...newBookings, model]);
        setModel(dummyBookings);

    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitting");
        console.log(model);
        if (model.email === "" || model.room.number === "" || model.room.type === "" || model.startTime === "" || model.endTime === "") {
            alert("Please fill out all fields");
            return;
        }

        if (addingNewBooking) {
            handleNewBooking(e);
        }
        else {
            handleUpdateBooking(e);
        }
    }



    const calculateCost = (startTime: string, endTime: string, roomType: string) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        if (duration < 0) {
            return 0;
        }
        // match roomType to allRooms.roomType and return price
        if (allRooms) {
            const room = allRooms.roomTypes.find(room => room._id === roomType);
            if (room) {

                return duration * room.hourlyRate;
            }
        }
        return 0;

    }


    return (
        <div id="authentication-modal" aria-hidden="true" className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full max-w-md md:h-auto">

                <div className="relative  rounded-lg shadow bg-gray-700 transform transition-all">
                    <button type="button"
                        onClick={() => {
                            setModel(
                                {
                                    "_id": "",
                                    "email": "",
                                    "room": {
                                        "_id": "",
                                        "number": "",
                                        "type": "",
                                        "__v": 0
                                    },
                                    "startTime": new Date().toISOString(),
                                    "endTime": new Date().toISOString(),
                                    "price": 0,
                                    "__v": 0
                                },
                            );
                            setAddingNewBooking(false);

                        }}
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                            {addingNewBooking ? "Add New Booking" : "Edit Booking"}

                        </h3>
                        <form className="space-y-6" action="#" onSubmit={
                            handleSubmit
                        }>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    onChange={(e) => {
                                        setModel({ ...model, email: e.target.value })
                                    }}
                                    type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={model.email} placeholder="Enter Email" required />
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <label htmlFor="roomNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your room number</label>
                                    <select
                                        onChange={
                                            (e) => {

                                                setModel({ ...model, room: { ...model.room, number: e.target.value } })
                                            }
                                        }
                                        defaultValue={model.room.number} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required
                                    // onChange={this.handleChange}
                                    >
                                        {// take room number that start with room type
                                            // get room type from model.room.type nd filter allRooms.rooms
                                            allRooms.rooms.filter((roomNumber) => {
                                                const roomTp = allRooms.roomTypes.find((roomType) => {
                                                    return roomType._id === model.room.type
                                                })?.name;
                                                console.log(`roomTp ${roomTp}`)
                                                return roomNumber.number.startsWith(roomTp!);
                                            })
                                                .map((roomNumber) => {
                                                    console.log(`Matched values ${roomNumber.number}`)
                                                    return <option value={roomNumber.number}>{roomNumber.number}</option>
                                                })
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="roomType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your room type</label>
                                    <select
                                        onChange={
                                            (e) => {
                                                setModel({ ...model, room: { ...model.room, type: e.target.value } })
                                                // update cost according to the room type and time
                                                // setModel({ ...model, cost: calculateCost(model.startTime, model.endTime, e.target.value) })
                                            }
                                        }
                                        defaultValue={
                                            allRooms.roomTypes.find((roomType) => {
                                                return roomType._id === model.room.type
                                            })?.name
                                        } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required
                                    // onChange={this.handleChange}
                                    >
                                        {
                                            allRooms.roomTypes.map((roomType) => {
                                                return <option value={roomType._id}>{roomType.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                            </div>
                            <div className="flex ">
                                <TimePicker bookings={bookings} roomNumber={model.room.number} model={model} setModel={setModel} calculateCost={calculateCost} />
                            </div>

                            <div>
                                <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Total Cost
                                </div>
                                <p className="w-40 bg-gray-400  py-2 px-2 rounded-lg">
                                    {
                                        calculateCost(model.startTime, model.endTime, model.room.type)
                                    }
                                </p>
                            </div>

                            <div className="grid grid-cols-6">
                                <button type="submit" className={`${addingNewBooking ? 'col-span-5' : 'col-span-3'} rounded-lg text-white font-sans font-bold text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                                    {addingNewBooking ? "Add Booking" : "Update Booking"}
                                </button>
                                {!addingNewBooking &&

                                    <button
                                        onClick={() => {
                                            handleDelete(model._id)
                                        }}
                                        type="button" className="col-span-3 text-white font- bg-red-600 hover:bg-red-700  focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800 ml-2" >Cancel Booking</button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateCreate