"use server";
import { connectMongoDB } from "@/config/db";
import BookingModel from "@/models/booking-model";

import { getCurrentUserFromMongoDB } from "./users";
import { revalidatePath } from "next/cache";
import RoomModel from "@/models/room-model";
connectMongoDB();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const checkRoomAvailability = async ({
  roomId,
  reqCheckIndate,
  reqCheckOutdate,
}: {
  roomId: string;
  reqCheckIndate: string;
  reqCheckOutdate: string;
}) => {
  try {
    const bookedSlot = await BookingModel.findOne({
      room: roomId,
      bookingStatus: "Booked",
      $or: [
        {
          checkInDate: {
            $gte: reqCheckIndate,
            $lte: reqCheckOutdate,
          },
        },
        {
          checkOutDate: {
            $gte: reqCheckIndate,
            $lte: reqCheckOutdate,
          },
        },
        {
          $and: [
            { checkInDate: { $lte: reqCheckIndate } },
            { checkOutDate: { $gte: reqCheckOutdate } },
          ],
        },
      ],
    });
    if (bookedSlot) {
      return {
        success: false,
      };
    } else {
      return {
        success: true,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const BookRoom = async (payload: any) => {
  try {
    const userResponse = await getCurrentUserFromMongoDB();
    payload.user = userResponse.data._id;
    const booking = new BookingModel(payload);
    await booking.save();
    revalidatePath("/user/bookings");
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const CancelBooking = async ({
  bookingId,
  paymentId,
}: {
  bookingId: string;
  paymentId: string;
}) => {
  try {
    await BookingModel.findByIdAndUpdate(bookingId, {
      bookingStatus: "Cancelled",
    });
    const refund = await stripe.refunds.create({ payment_intent: paymentId });
    if (refund.status !== "succeeded") {
      return {
        success: false,
        message:
          "Your booking has been cancelled,but refunds failed,Pls contact for the support",
      };
    } else {
      revalidatePath("/user/bookings");
      return {
        success: true,
        message: "Your booking has been cancelled & refund processed",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAvailableRooms = async ({
  reqCheckInDate,
  reqCheckOutDate,
  type,
}: {
  reqCheckInDate: string;
  reqCheckOutDate: string;
  type: string;
}) => {
  try {
    if (!reqCheckInDate || !reqCheckOutDate) {
      const rooms = await RoomModel.find({
        ...(type && { type }),
      }).populate("hotel");
      return {
        success: true,
        data: JSON.parse(JSON.stringify(rooms)),
      };
    }
    const bookedSlots = await BookingModel.find({
      bookingStatus: "Booked",
      $or: [
        {
          checkInDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate,
          },
        },
        {
          checkOutDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate,
          },
        },
        {
          $and: [
            { checkInDate: { $lte: reqCheckInDate } },
            { checkOutDate: { $gte: reqCheckOutDate } },
          ],
        },
      ],
    });
    const bookedRoomIds = bookedSlots.map((slot) => slot.room);
    const rooms = await RoomModel.find({
      _id: { $nin: bookedRoomIds },
      ...(type && { type }),
    }).populate("hotel");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(rooms)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export default checkRoomAvailability;
