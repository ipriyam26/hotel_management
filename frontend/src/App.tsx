import { useEffect, useState } from "react";
import NavBar from "./components/navbar";
import "react-datepicker/dist/react-datepicker.css";
import BookingList from "./components/booklist";
import { AllRoomsResponse, ApiResponse, Booking } from "./types";
import { API_URL } from "./constants";
import SearchBox from "./components/search";
import UpdateCreate from "./components/create";

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
  const [tempBookings, setTempBookings] = useState<Booking[]>([]);
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

  async function fetchBookings() {
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
      // deep copy of bookingsList into tempBookings
      setTempBookings(JSON.parse(JSON.stringify(bookingsList)));
      setAllBookings(bookingsList);
      console.log(bookingsList);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchData = async () => {
    const response = await fetch(`${API_URL}/rooms/allrooms`);
    const data = await response.json();
    setAllRooms(data);
  };

  useEffect(() => {





    fetchData();
    fetchBookings();
  }, []);






  const [addingNewBooking, setAddingNewBooking] = useState(false);




  const [model, setModel] = useState<Booking>(
    dummyBookings
  );









  // {
  //   "message": "Booking deleted successfully",
  //   "refundPercent": 100,
  //   "refundAmount": 320
  // }



  if (!allRooms) {
    return <div>Loading...</div>
  }

  return (



    <div className="bg-gray-800  h-screen">
      <NavBar></NavBar>
      <div className="bg-gray-800 px-4 py-8">
        <div className="flex justify-center">
          <div className="md:flex md:justify-evenly md:w-full max-w-7xl">
            <div id="currentBookings" className="bg-gray-900 shadow-md p-3 w-96 h-52 rounded-lg mb-5">
              <div className="text-xl font-sans text-white">
                Active Bookings
              </div>
              <div className="text-5xl text-center font-bold text-yellow-500 mt-10">
                {
                  // find all bookings where endTime is greater than current time
                  bookings.filter(booking => new Date(booking.endTime).getTime() > new Date().getTime()).length
                }
              </div>
            </div>
            <div id="currentBookings" className="bg-gray-900 shadow-md p-3 w-96 h-52 rounded-lg mb-5">
              <div className="text-xl font-sans text-white">
                24H Sales
              </div>
              <div className="text-5xl text-center font-bold text-green-500 mt-10">
                {
                  // find the the number of bookings where startTime is greater than last 24 hours
                  bookings.filter(booking => new Date(booking.startTime).getTime() > new Date().getTime() - 24 * 60 * 60 * 1000).length
                }
              </div>
            </div>
            <div id="currentBookings" className="bg-gray-900 shadow-md p-3 w-96 h-52 rounded-lg mb-5">
              <div className="text-xl font-sans text-white">
                Total Active Sales
              </div>
              <div className="text-5xl text-center font-bold text-blue-500 mt-10">
                {`₹${
                  // find the the number of bookings where startTime is greater than last 24 hours
                  bookings.filter(booking => new Date(booking.startTime).getTime() > new Date().getTime() - 24 * 60 * 60 * 1000).reduce((acc, booking) => acc + booking.price, 0).toFixed(2)
                  }`}
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="md:grid md:grid-cols-7 md:mx-5">
        <div className="md:col-span-5">
          <div>
            <SearchBox
              bookings={bookings}
              setBookings={
                setAllBookings
              }
              roomTypes={allRooms.roomTypes}
              rooms={allRooms.rooms}
              tempBookings={tempBookings}

            ></SearchBox>

            <div className="">

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
                        return <tr key={booking._id} className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
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
                            ₹{booking.price.toFixed(2)}
                          </td>
                          {
                            // if start time is greater than current time, then show the edit button
                            new Date(booking.startTime).getTime() > new Date().getTime() ?
                              <td className={`px-6 py-4 text-right `}>
                                <button onClick={() => {
                                  console.log(`edit ${booking}`);
                                  console.log(booking);
                                  setModel(booking);
                                }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                              </td> :
                              <td className={`px-6 py-4 text-right `}>
                                <button className="font-medium  text-gray-600 dark:text-gray-500 hover:underline">Edit</button>
                              </td>
                          }
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

                      <div className="text-sm text-green-500 font-bold">₹{booking.price.toFixed(2)}</div>
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
          <UpdateCreate
            model={model}
            setModel={setModel}
            setAddingNewBooking={setAddingNewBooking}
            addingNewBooking={addingNewBooking}
            bookings={bookings}
            allRooms={allRooms!}
            setAllBookings={setAllBookings}
          ></UpdateCreate>
          : null
      }

    </div>)
}
export default App;