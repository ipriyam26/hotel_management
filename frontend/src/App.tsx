import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/navbar";
import SearchBox from "./components/search";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import TimePicker from "./components/timepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookingList from "./components/booklist";

export interface bookings {
  userEmail: string,
  roomNumber: string,
  roomType: string,
  startTime: string,
  endTime: string,
  cost: number

}

const App = () => {
  const range = (start: number, end: number) => Array.from(Array(end - start + 1).keys()).map(x => x + start);
  const hours = range(0, 23);
  const roomNumbers = ["A1", "A2", "A3", "B1", `B2`, `B3`, `C1`, `C2`, `C3`]
  const roomTypes = ["A", "B", "C"]
  const activeBookings = 9;
  const availableSales = 9;
  const totalSales = 900;
  const [model, setModel] = useState<bookings>({
    userEmail: "", roomNumber:
      "", roomType: "", startTime: "", endTime: "", cost: 0
  });
  const [value, setChange] = useState(new Date());
  const todaysBookings = [
    {
      "userEmail": "random@gmail.com",
      "roomNumber": "A1",
      "roomType": "A",
      "date": "2023-03-11T15:00:00",
      "cost": 1000
    },
    {
      "userEmail": "random2@gmail.com",
      "roomNumber": "A2",
      "roomType": "A",
      "date": "2023-03-11T12:00:00",
      "cost": 2000
    }, {
      "userEmail": "random@gmail.com",
      "roomNumber": "A3",
      "roomType": "A",
      "date": "2023-03-11T18:00:00",
      "cost": 1000
    },
  ]


  const excludeTimes = (date: Date) => {
    const excludedTimes = [];
    // Replace the condition below with your own logic to determine which times should be excluded
    if (date.getHours() < 9 || date.getHours() > 17) {
      excludedTimes.push(new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0));
      excludedTimes.push(new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 30));
    }
    return excludedTimes;
  };
  const bookings = [
    {
      "userEmail": "random@gmail.com",
      "roomNumber": "A1",
      "roomType": "A",
      "startTime": "2023-03-11T10:00:00",
      "endTime": "2023-03-11T12:00:00",
      "cost": 1000
    },
    {
      "userEmail": "random2@gmail.com",
      "roomNumber": "A1",
      "roomType": "A",
      "startTime": "2023-03-11T18:00:00",
      "endTime": "2023-03-11T23:00:00",
      "cost": 2000
    },
  ]

  return (
    <div className="bg-gray-800">
      <NavBar></NavBar>
      <div className="bg-gray-800 px-4 py-8">
        <div className="flex justify-center">
          <div className="md:flex md:justify-evenly md:w-full max-w-7xl">
            <div id="currentBookings" className="bg-gray-900 shadow-md p-3 w-72 h-48 rounded-lg mb-5">
              <div className="text-lg font-sans text-white">
                Active Bookings
              </div>
              <div className="text-5xl text-center font-bold text-yellow-500 mt-10">
                {activeBookings}
              </div>
            </div>
            <div id="currentBookings" className="bg-gray-900 shadow-md p-3 w-72 h-48 rounded-lg mb-5">
              <div className="text-lg font-sans text-white">
                Available Sales
              </div>
              <div className="text-5xl text-center font-bold text-green-500 mt-10">
                {availableSales}
              </div>
            </div>
            <div id="currentBookings" className="bg-gray-900 shadow-md p-3 w-72 h-48 rounded-lg mb-5">
              <div className="text-lg font-sans text-white">
                Total Sales
              </div>
              <div className="text-5xl text-center font-bold text-blue-500 mt-10">
                {`₹${totalSales}`}
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
                            {booking.userEmail}
                          </th>
                          <td className="px-6 py-4">
                            {booking.roomType}
                          </td>
                          <td className="px-6 py-4">
                            {booking.roomNumber}
                          </td>
                          <td className="px-6 py-4">
                            {booking.startTime}
                          </td>
                          <td className="px-6 py-4">
                            ₹{booking.cost}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => {
                              setModel({
                                userEmail: booking.userEmail,
                                roomNumber: booking.roomNumber,
                                roomType: booking.roomType,
                                startTime: booking.startTime,
                                endTime: booking.endTime,
                                cost: booking.cost
                              })
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
          <button className="px-4 py-2 w-full font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:bg-blue-600">
            New Booking
          </button>
          <div className="bg-gray-900 shadow-md p-3 w-full h-1/2 rounded-lg mt-4">
            <div className="text-lg font-sans text-white">
              Today's Upcoming Bookings
            </div>
            <div className="overflow-y-scroll h-5/6 my-2">
              <ul className="divide-y h-5/6  divide-gray-700">
                {todaysBookings.map((booking) => (
                  <li className="py-3 overflow-hidden">
                    <div className="font-medium text-blue-500">{booking.userEmail}</div>
                    <div className="text-sm text-gray-400">{booking.roomNumber}</div>
                    <div className="text-sm text-gray-400">{booking.roomType}</div>
                    <div className="text-sm text-gray-400">

                      {new Date(booking.date).getHours()} IST
                    </div>

                    <div className="text-sm text-green-500 font-bold">₹{booking.cost}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <BookingList roomNumbers={roomNumbers} bookings={bookings} />

        </div>


      </div>

      {
        model.userEmail !== "" ?

          <div id="authentication-modal" aria-hidden="true" className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full max-w-md md:h-auto">

              <div className="relative  rounded-lg shadow bg-gray-700 transform transition-all">
                <button type="button"
                  onClick={() => { setModel({ userEmail: "", roomNumber: "", roomType: "", startTime: "", endTime: "", cost: 0 }) }}
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="px-6 py-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Update Booking details</h3>
                  <form className="space-y-6" action="#">
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={model.userEmail} placeholder={model.userEmail} required />
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <label htmlFor="roomNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your room number</label>
                        <select defaultValue={model.roomNumber} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required
                        // onChange={this.handleChange}
                        >
                          {
                            roomNumbers.map((roomNumber) => {
                              return <option value={roomNumber}>{roomNumber}</option>
                            })
                          }
                        </select>
                      </div>
                      <div>
                        <label htmlFor="roomType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your room type</label>
                        <select defaultValue={model.roomType} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required
                        // onChange={this.handleChange}
                        >
                          {
                            roomTypes.map((roomType) => {
                              return <option value={roomType}>{roomType}</option>
                            })
                          }
                        </select>
                      </div>

                    </div>
                    <div className="flex ">
                      <TimePicker bookings={bookings} roomNumber={model.roomNumber} />
                      {/* <DatePicker
                        showTimeSelect
                        selected={value}
                        className="block text-white p-2 mt-1 bg-gray-600 rounded-lg shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onSelect={(date) => setChange(date!)}
                        onChange={(date) => setChange(date!)}
                        minDate={new Date()}
                        excludeTimes={excludeTimes(value)}
                        locale="pt-BR"
                        timeFormat="p"
                        timeIntervals={60}
                        dateFormat="Pp"
                      />

                      <DatePicker
                        showTimeSelect
                        className="block text-white p-2 mt-1 ml-5 bg-gray-600 rounded-lg shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        selected={value}
                        onSelect={(date) => setChange(date!)}
                        onChange={(date) => setChange(date!)}
                        minDate={new Date()}
                        excludeTimes={excludeTimes(value)}
                        locale="pt-BR"
                        timeFormat="p"
                        timeIntervals={60}
                        dateFormat="Pp"
                      /> */}
                    </div>

                    <div>
                      <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Total Cost
                      </div>
                      <p className="w-40 bg-gray-400  py-2 px-2 rounded-lg">

                        {model.cost}
                      </p>
                    </div>

                    <div className="grid grid-cols-6">
                      <button type="submit" className="col-span-3 rounded-lg text-white font-sans font-bold text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Booking</button>
                      <button type="button" className="col-span-3 text-white font- bg-red-600 hover:bg-red-700  focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800 ml-2" >Cancel Booking</button>
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