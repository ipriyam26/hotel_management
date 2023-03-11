import React from 'react'
import { bookings } from '../App';
import DatePicker from 'react-datepicker';
import { Booking } from '../types';
type Props = {
    bookings: Booking[];
    roomNumber: string;
    model: Booking;
    setModel: React.Dispatch<React.SetStateAction<Booking>>;

    calculateCost: (startTime: string, endTime: string, roomType: string) => number;
}

function TimePicker({ bookings, roomNumber, model, setModel, calculateCost }: Props) {

    // const [value, setChange] = React.useState(new Date());
    // const [endvalue, endSetChange] = React.useState(new Date());
    // const [excludeDate, setExcludeDate] = React.useState<Date>(new Date());
    function getExcludedTimeSlots(bookings: Booking[], roomFilter: string): Date[] {
        // Initialize an empty array to hold the excluded time slots
        const excludedTimeSlots: Date[] = [];

        // Loop through each booking
        for (const booking of bookings) {
            // Check if the booking matches the room filter
            if (booking.room.number === roomFilter || booking.room.type === roomFilter) {
                // Convert the start and end times of the booking to Date objects
                const startTime = new Date(booking.startTime);
                const endTime = new Date(booking.endTime);

                // Calculate the duration of the booking in hours
                const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

                // Loop through each hour of the booking and add it to the excluded time slots array
                for (let i = 0; i < duration; i++) {
                    const excludedTimeSlot = new Date(startTime.getTime() + i * 60 * 60 * 1000);
                    excludedTimeSlots.push(excludedTimeSlot);
                }
            }
        }


        return excludedTimeSlots;
    }


    const getAvaliableEndTimeSlots = (bookings: bookings[], roomFilter: string, startTime: Date): Date => {

        bookings = bookings.filter((booking) => booking.roomNumber === roomFilter || booking.roomType === roomFilter);

        const sortedBookings = bookings.sort((a, b) => {
            const startTimeA: Date = new Date(a.startTime);
            const startTimeB: Date = new Date(b.startTime);
            return startTimeA.getTime() - startTimeB.getTime();
        });
        let i = 0;
        // iterate till i startTime is greater than the startTime of the booking
        for (i = 0; i < sortedBookings.length; i++) {
            const booking = sortedBookings[i];
            const bookingStartTime = new Date(booking.startTime);
            if (bookingStartTime.getTime() > startTime.getTime()) {
                break;
            }
        }
        return new Date(sortedBookings[i].startTime);


    }

    const getExcludedEndTimeSlots = (bookings: bookings[], roomFilter: string, startTime: Date): Date[] => {
        const excludedTimeSLots: Date[] = []
        // also exclude all the time before start time
        const currentTime = startTime;
        for (let i = 0; i < 24; i++) {
            const excludedTimeSlot = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), i, 0, 0);
            if (excludedTimeSlot.getTime() < currentTime.getTime()) {
                excludedTimeSLots.push(excludedTimeSlot);
            }
        }
        // also exclude all the time after avaliable end time till 24
        const avaliableEndTime = getAvaliableEndTimeSlots(bookings, roomFilter, startTime);
        //exclude all the dates after the avaliable end time date +1
        // setExcludeDate(new Date(avaliableEndTime.getFullYear(), avaliableEndTime.getMonth(), avaliableEndTime.getDate() + 1, 0, 0, 0));
        for (let i = 0; i < 24; i++) {
            const excludedTimeSlot = new Date(avaliableEndTime.getFullYear(), avaliableEndTime.getMonth(), avaliableEndTime.getDate(), i, 0, 0);
            if (excludedTimeSlot.getTime() > avaliableEndTime.getTime()) {
                excludedTimeSLots.push(excludedTimeSlot);
            }
        }

        return excludedTimeSLots;

    }

    const handleStartChange = (date: Date | null, event: React.SyntheticEvent<any, Event> | undefined) => {
        // setChange(date!);
        // setModel({ ...model, startTime: date!.toISOString() });

    }

    const filterTime = (date: Date) => {
        const isPastTime = new Date().getTime() > date.getTime();
        // if value is not current time then check if the date is smaller than value
        // also is the date is smaller than value then return false
        // if (date.getTime() < value.getTime()) {
        //     return false;
        // }   
        // get excluded time slots and check if the date is in the excluded start time slots is it is then return false
        const excludedTimeSlots = getExcludedTimeSlots(bookings, roomNumber);
        const isExcludedTimeSlot = excludedTimeSlots.some((excludedTimeSlot) => {
            return excludedTimeSlot.getTime() === date.getTime();
        });
        if (isExcludedTimeSlot) {
            return false;
        }
        return !isPastTime;
    };


    return (
        <div className='flex space-x-2'>
            <DatePicker
                showTimeSelect

                selected={new Date(model.startTime)}
                className="block text-white p-2 mt-1 bg-gray-600 rounded-lg shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onSelect={
                    (date: Date | null, event: React.SyntheticEvent<any, Event> | undefined) => {
                        // setChange(date!);
                        setModel({ ...model, startTime: date!.toISOString() });
                        if (model.startTime < model.endTime) {
                            // set cost
                            setModel({ ...model, price: calculateCost(model.startTime, model.endTime, roomNumber) });
                        }
                    }
                }
                onChange={
                    (date: Date | null, event: React.SyntheticEvent<any, Event> | undefined) => {

                        setModel({ ...model, startTime: date!.toISOString() });

                        if (model.startTime < model.endTime) {
                            // set cost
                            setModel({ ...model, price: calculateCost(model.startTime, model.endTime, roomNumber) });
                        }
                    }
                }
                minDate={new Date()}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"

                filterTime={filterTime}

                timeIntervals={60}
            />

            {
                // avalilbaleSlots.length > 0 &&
                <DatePicker
                    showTimeSelect
                    selected={new Date(model.endTime)}
                    className="block text-white p-2 mt-1 bg-gray-600 rounded-lg shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    onSelect={
                        (date: Date | null, event: React.SyntheticEvent<any, Event> | undefined) => {
                            setModel({ ...model, endTime: date!.toISOString() });
                            console.log("updating time")


                        }
                    }
                    onChange={(date: Date | null, event: React.SyntheticEvent<any, Event> | undefined) => {
                        // endSetChange(date!);
                        console.log("updating time")
                        setModel({ ...model, endTime: date!.toISOString() });

                    }}
                    minDate={new Date()}

                    timeFormat="p"
                    timeIntervals={60}
                    filterTime={filterTime}
                    dateFormat="Pp"
                />}

        </div>
    )
}

export default TimePicker