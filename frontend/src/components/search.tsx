import React from "react";
import { Booking, Room, RoomType } from "../types";


type Props = {
    setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
    bookings: Booking[];
    roomTypes: RoomType[];
    rooms: Room[];
    tempBookings: Booking[];
}

function SearchBox({ setBookings, bookings, roomTypes, rooms,tempBookings }: Props) {
    const [search, setSearch] = React.useState("");
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    const handleSeachSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setBookings(tempBookings);
        // convert search to lowercase and try to match it to the name of the room or the type of the room or email of the user
        const filteredBookings = tempBookings.filter(booking => booking.room.number.toLowerCase().includes(search.toLowerCase()) || booking.room.type.toLowerCase().includes(search.toLowerCase()) || booking.email.toLowerCase().includes(search.toLowerCase())
            || booking.startTime.toLowerCase().includes(search.toLowerCase()) || booking.endTime.toLowerCase().includes(search.toLowerCase()));
        setBookings(filteredBookings);

    }

    return (

        <div>
            <form className="flex items-center mb-4" onSubmit={handleSeachSubmit}>
                <label htmlFor="simple-search" className="sr-only">Search</label>

                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input onChange={handleSearch} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                </div>
                <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span className="sr-only">Search</span>
                </button>
            </form>
            <div className="flex justify-center mb-4  ">

                <select
                
                className="mr-2 w-24 bg-gray-700 border-white"
                    onChange={
                        (e) => {
                            setBookings(tempBookings);
                            const filteredBookings = tempBookings.filter(booking => booking.room.type === e.target.value);
                            setBookings(filteredBookings);
                        }
                    }
                    defaultValue="all"
                >
                    {
                        roomTypes.map((roomType) => (
                            <option
                            className="mr-2"
                            key={roomType._id} value={roomType._id}>{roomType.name}</option>
                        ))

                    }
                </select>
                <select
                className="mr-2 w-24 bg-gray-700 "
                    onChange={
                        (e) => {
                            setBookings(tempBookings);
                            console.log("tempBookings");
                            console.log(bookings);
                            const filteredBookings = tempBookings.filter(booking => booking.room.number === e.target.value);
                            setBookings(filteredBookings);
                        }
                    }
                >
                    {
                        rooms.map((room) => (
                            <option 
                            className="mr-2"
                            key={room._id} value={room.number}>{room.number}</option>
                        ))
                    }

                </select>
            </div>

        </div>

    )
}

export default SearchBox