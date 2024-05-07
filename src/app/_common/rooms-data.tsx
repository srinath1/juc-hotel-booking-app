import RoomModel from "@/models/room-model";
import React from "react";
import { RoomType } from "@/interfaces";
import Link from "next/link";
import { getAvailableRooms } from "@/server-actions/bookings";
const RoomsData = async ({ searchParams }: { searchParams: any }) => {
  const response = await getAvailableRooms({
    reqCheckInDate: searchParams.checkIn || "",
    reqCheckOutDate: searchParams.checkOut || "",
    type: searchParams.type,
  });
  const rooms: RoomType[] = response.data;
  if (rooms.length === 0) {
    return <div>No rooms found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {rooms.map((room: RoomType) => {
        return (
          <Link
            href={`book-room/${room._id}`}
            key={room._id}
            className="no-underline text-black"
          >
            <div className="flex flex-col gap-2 border border-gray-200 border-solid room-card">
              <img src={room?.media[0]} className="w-full h-64 object-cover" />
              <div className="px-3  py-2 flex flex-col text-sm gap-2">
                <span>{room.name}</span>
                <span className="text-gray-500 text-sm    ">
                  {room?.hotel?.name}-{room?.hotel?.address}
                </span>

                <hr className="border-gray-200 border border-solid" />
                <div className="flex justify-between">
                  <span>DKK {room.rentPerDay} Per/Day</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default RoomsData;
