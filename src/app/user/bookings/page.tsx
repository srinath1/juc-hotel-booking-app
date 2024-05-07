import PageTitle from "@/components/PageTile";
import BookingModel from "@/models/booking-model";
import { getCurrentUserFromMongoDB } from "@/server-actions/users";
import React from "react";
import UserBookingTable from "../_common/user-bookings-table";

async function BookingsPage() {
  const userResponse = await getCurrentUserFromMongoDB();
  const userBookingsResponse = await BookingModel.find({
    user: userResponse.data._id,
  })
    .populate("room")
    .populate("hotel")
    .sort({ createdAt: -1 });
  const userBookings = JSON.parse(JSON.stringify(userBookingsResponse));
  return (
    <div>
      <PageTitle title="My Bookings" />
      <UserBookingTable bookings={userBookings} />
    </div>
  );
}

export default BookingsPage;
