import { RoomType } from "@/interfaces";
import RoomModel from "@/models/room-model";
import React from "react";
import RoomInfo from "../_common/room-info";
import Checkout from "../_common/checkout";

const BookRoomPage = async ({ params }: { params: { id: string } }) => {
  const response = await RoomModel.findById(params.id).populate("hotel");
  const room: RoomType = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <div>
        <h1 className="font-bold teaxt-gray-700 text-2xl">
          {room.name}-{room.hotel.name}
        </h1>
        <span className="text-gray-500 text-sm">{room.hotel.address}</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="col-span-2">
          <RoomInfo room={room} />
        </div>
        <div className="col-span-1">{<Checkout room={room} />}</div>
      </div>
    </div>
  );
};

export default BookRoomPage;
