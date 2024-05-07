import BookingModel from "@/models/booking-model";
import React from "react";
import AdminBookingsTable from "../../_common/admin-bookings-table";
import dayjs from "dayjs";

const ReportsData = async ({ searchParams }: { searchParams: any }) => {
  const response = await BookingModel.find({
    bookingStatus: "Booked",
    createdAt: {
      $gte: dayjs(searchParams.startDate).startOf("day").toDate(),
      $lte: dayjs(searchParams.endDate).endOf("day").toDate(),
    },
  })
    .populate("user")
    .populate("room")
    .populate("hotel");
  const bookings = JSON.parse(JSON.stringify(response));
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce(
    (acc: number, booking: any) => acc + booking.totalAmount,
    0
  );
  return (
    <div>
      <div className=" md:flex-row flex-col flex gap-10">
        <div className="border border-gray-300 px-10 py-7 flex flex-col border-solid gap-5">
          <h1 className="text-xl font-bold text-gray-600">Total Bookings</h1>
          <h1 className="text-3xl font-bold text-blue-800 text-center">
            {totalBookings}
          </h1>
        </div>
        <div className="border border-gray-300 px-10 py-7 flex flex-col border-solid gap-5">
          <h1 className="text-xl font-bold text-gray-600">Total Revenue</h1>
          <h1 className="text-3xl font-bold text-blue-800 text-center">
            {totalRevenue} <span>DKK</span>
          </h1>
        </div>
      </div>
      <AdminBookingsTable bookings={bookings} />
    </div>
  );
};

export default ReportsData;
