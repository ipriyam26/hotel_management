import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/navbar";
import SearchBox from "./components/search";
import TimePicker from "./components/timepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookingList from "./components/booklist";
import { AllRoomsResponse, ApiResponse, Booking, BookingsByRoomType, BookingUpdate, createBookingResponse } from "./types";
import { API_URL } from "./constants";

export interface bookings {
  userEmail: string,
  roomNumber: string,
  roomType: string,
  startTime: string,
  endTime: string,
  cost: number

}

const App = () => {


  const [allRooms, setAllRooms] = useState<AllRoomsResponse | null>(null);

  // const [bookings2, setBookings] = useState<BookingsByRoomType>({});
  const [bookings, setAllBookings] = useState<Booking[]>([]);




  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${API_URL}/bookings`);
        const data: ApiResponse = await response.json();
        // setBookings(data.bookingsByRoomType);

        const bookingsList = Object.values(data.bookingsByRoomType).reduce((accumulator, roomType) => {
          const roomTypeBookings = Object.values(roomType).reduce((bookingAccumulator, bookings) => {
            return [...bookingAccumulator, ...bookings];
          }, [] as Booking[]);
          return [...accumulator, ...roomTypeBookings];
        }, [] as Booking[]);

        setAllBookings(bookingsList);
        console.log(bookingsList);
      } catch (error) {
        console.log(error);
      }
    };


    const fetchData = async () => {
      const response = await fetch(`${API_URL}/rooms/allrooms`);
      const data = await response.json();
      setAllRooms(data);
    };

    fetchData();
    fetchBookings();
  }, []);






  const [addingNewBooking, setAddingNewBooking] = useState(false);
  // const roomNumbers = ["A1", "A2", "A3", "B1", `B2`, `B3`, `C1`, `C2`, `C3`]
  // const roomTypes = ["A", "B", "C"]
  const activeBookings = 9;
  const availableSales = 9;
  const totalSales = 900;


  const [model, setModel] = useState<Booking>(
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
    )
  }

  const handleUpdateBooking = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("update booking");
    updateBooking();
    // remove old booking from bookings array and add new booking
    const newBookings = bookings.filter(booking => booking._id !== model._id);
    setAllBookings([...newBookings, model]);
    setModel({
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
    },)

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
      const room = allRooms.roomTypes.find(room => room.name === roomType);
      if (room) {

        return duration * room.hourlyRate;
      }
    }
    return 0;

  }
  // const bookings = [
  //   {
  //     "userEmail": "random@gmail.com",
  //     "roomNumber": "A1",
  //     "roomType": "A",
  //     "startTime": "2023-03-11T10:00:00",
  //     "endTime": "2023-03-11T12:00:00",
  //     "cost": 1000
  //   },
  //   {
  //     "userEmail": "random2@gmail.com",
  //     "roomNumber": "A1",
  //     "roomType": "A",
  //     "startTime": "2023-03-11T18:00:00",
  //     "endTime": "2023-03-11T23:00:00",
  //     "cost": 2000
  //   },
  // ]

  if (!allRooms) {
    return <div>Loading...</div>
  }

  return (



    <div className="bg-gray-800">
      <NavBar></NavBar>
      <div className="bg-gray-800 px-4 py-8">
        <div className="flex justify-center">
          <div className="md:flex md:justify-evenly md:w-full max-w-7xl">
            <div id="currentBookings" className="bg-gray-900 shadow-md p-3 w-96 h-64 rounded-lg mb-5">
              <div className="text-lg font-sans text-white">
                Active Bookings
              </div>
              <div className="text-5xl text-center font-bold text-yellow-500 mt-12">
                {
                  // find all bookings where endTime is greater than current time
                  bookings.filter(booking => new Date(booking.endTime).getTime() > new Date().getTime()).length
                }
              </div>
            </div>
            <div id="currentBookings" className="bg-gray-900 shadow-md p-3 w-96 h-64 rounded-lg mb-5">
              <div className="text-lg font-sans text-white">
                Available Sales
              </div>
              <div className="text-5xl text-center font-bold text-green-500 mt-12">
                {
                  // find the the number of bookings where startTime is greater than last 24 hours
                  bookings.filter(booking => new Date(booking.startTime).getTime() > new Date().getTime() - 24 * 60 * 60 * 1000).length
                }
              </div>
            </div>
            <div id="currentBookings" className="bg-gray-900 shadow-md p-3 w-96 h-64 rounded-lg mb-5">
              <div className="text-lg font-sans text-white">
                Total Sales
              </div>
              <div className="text-5xl text-center font-bold text-blue-500 mt-12">
                {`₹${
                  // find the the number of bookings where startTime is greater than last 24 hours
                  bookings.filter(booking => new Date(booking.startTime).getTime() > new Date().getTime() - 24 * 60 * 60 * 1000).reduce((acc, booking) => acc + booking.price, 0)
                  }`}
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="md:grid md:grid-cols-7 md:mx-5">
        <div className="md:col-span-5">
          <div>
            <SearchBox></SearchBox>

            <div className="mt-4">

              <div className="relative overflow-x-auto shadow-lg sm:rounded-lg max-h-[40rem] overflow-scroll">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        User Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Room Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Room Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Cost
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      bookings.map((booking) => {
                        return <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {booking.email}
                          </th>
                          <td className="px-6 py-4">
                            {booking.room.number}
                          </td>
                          <td className="px-6 py-4">
                            {
                              // match the room type with the room type in allRooms and get the name
                              allRooms.roomTypes.find(room => room._id === booking.room.type)?.name
                            }
                          </td>
                          <td className="px-6 py-4">

                            {new Date(booking.startTime).toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            ₹{booking.price}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => {
                              setModel(booking)
                            }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                          </td>
                        </tr>
                      })
                    }

                  </tbody>
                </table>
              </div>

            </div>

          </div>
        </div>
        <div className="md:col-span-2 ml-4">
          <button onClick={
            () => {
              setModel({
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
              },);
              setAddingNewBooking(true);
            }
          } className="px-4 py-2 w-full font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:bg-blue-600">
            New Booking
          </button>
          <div className="bg-gray-900 shadow-md p-3 w-full h-1/2 rounded-lg mt-4">
            <div className="text-lg font-sans text-white">
              Today's Upcoming Bookings
            </div>
            <div className="overflow-y-scroll h-5/6 my-2">
              <ul className="divide-y h-5/6  divide-gray-700">

                {bookings.filter((booking) => {
                  const date = new Date(booking.startTime);
                  const today = new Date();
                  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
                })
                  .map((booking) => (
                    <li className="py-3 overflow-hidden">
                      <div className="font-medium text-blue-500">{booking.email}</div>
                      <div className="text-sm text-gray-400">{booking.room.number}</div>

                      <div className="text-sm text-gray-400">

                        {new Date(booking.startTime).getHours()}:00 IST
                      </div>

                      <div className="text-sm text-green-500 font-bold">₹{booking.price}</div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <BookingList roomNumbers={allRooms?.rooms} bookings={bookings} />

        </div>


      </div>

      {
        model.email !== "" || addingNewBooking ?

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
                            allRooms.rooms.filter((roomNumber) => {
                              return roomNumber.number.startsWith(model.room.type)
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
                          defaultValue={model.room.type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required
                        // onChange={this.handleChange}
                        >
                          {
                            allRooms.roomTypes.map((roomType) => {
                              return <option value={roomType.name}>{roomType.name}</option>
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
                        <button type="button" className="col-span-3 text-white font- bg-red-600 hover:bg-red-700  focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800 ml-2" >Cancel Booking</button>}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div> : null
      }

    </div>)
}
export default App;