import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/navbar";
import SearchBox from "./components/search";


interface bookings{
  userEmail:string,
  roomNumber:number,
  roomType:string,
  date:string,
  cost:number
}

const App = () => {

  const activeBookings = 9;
  const availableSales = 9;
  const totalSales = 900;
  // const {model, setOpenModal} = useState();

  const bookings = [
    {
      "userEmail": "random@gmail.com",
      "roomNumber": 101,
      "roomType": "Single",
      "date": "2021-05-01",
      "cost": 1000
    },
    {
      "userEmail": "random2@gmail.com",
      "roomNumber": 102,
      "roomType": "Double",
      "date": "2021-05-01",
      "cost": 2000
    }, {
      "userEmail": "random@gmail.com",
      "roomNumber": 101,
      "roomType": "Single",
      "date": "2021-05-01",
      "cost": 1000
    },
    {
      "userEmail": "random2@gmail.com",
      "roomNumber": 102,
      "roomType": "Double",
      "date": "2021-05-01",
      "cost": 2000
    },

    {
      "userEmail": "random@gmail.com",
      "roomNumber": 101,
      "roomType": "Single",
      "date": "2021-05-01",
      "cost": 1000
    },
    {
      "userEmail": "random2@gmail.com",
      "roomNumber": 102,
      "roomType": "Double",
      "date": "2021-05-01",
      "cost": 2000
    }, {
      "userEmail": "random@gmail.com",
      "roomNumber": 101,
      "roomType": "Single",
      "date": "2021-05-01",
      "cost": 1000
    },
    {
      "userEmail": "random2@gmail.com",
      "roomNumber": 102,
      "roomType": "Double",
      "date": "2021-05-01",
      "cost": 2000
    },

    {
      "userEmail": "random@gmail.com",
      "roomNumber": 101,
      "roomType": "Single",
      "date": "2021-05-01",
      "cost": 1000
    },
    {
      "userEmail": "random2@gmail.com",
      "roomNumber": 102,
      "roomType": "Double",
      "date": "2021-05-01",
      "cost": 2000
    }, {
      "userEmail": "random@gmail.com",
      "roomNumber": 101,
      "roomType": "Single",
      "date": "2021-05-01",
      "cost": 1000
    },
    {
      "userEmail": "random2@gmail.com",
      "roomNumber": 102,
      "roomType": "Double",
      "date": "2021-05-01",
      "cost": 2000
    },
  ]

  return (
    <div>
      <NavBar></NavBar>
      {/* <div className=" ">
        <div className="flex justify-center mt-5">
          <div className=" md:flex md:justify-evenly md:w-screen" >
            <div id="currentBookings" className="shadow-md p-3 w-72 h-48 rounded-lg  mb-5">
              <div className="text-lg font-sans">
                Active Bookings
              </div>
              <div className="text-5xl text-center font-bold mt-10">
                {activeBookings}
              </div>
            </div>
            <div id="currentBookings" className="shadow-md p-3 w-72 h-48 rounded-lg  mb-5 ">
              <div className="text-lg font-sans">
                Available Sales
              </div>
              <div className="text-5xl text-center font-bold mt-10 ">
                {availableSales}
              </div>
            </div>
            <div id="currentBookings" className="shadow-md p-3 w-72 h-48 rounded-lg  mb-5 ">
              <div className="text-lg font-sans">
                Total Sales
              </div>
              <div className="text-5xl text-center font-bold mt-10 ">
                {`₹${totalSales}`}
              </div>
            </div>
            
          </div>
        </div>
      </div> */}

      <div className="md:grid md:grid-cols-7 md:mx-5">
        <div className="md:col-span-5">
          <div>
            <SearchBox></SearchBox>

            <div>

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[40rem] overflow-scroll">
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
                            {booking.date}
                          </td>
                          <td className="px-6 py-4">
                            ₹{booking.cost}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
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
        <div className="md:col-span-2">
          left
        </div>
      </div>

      <div id="authentication-modal" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
        <div className="relative w-full h-full max-w-md md:h-auto">

          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
              <form className="space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                    </div>
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                  </div>
                  <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>)
}
export default App;