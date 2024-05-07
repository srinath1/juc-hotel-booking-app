import LinkButton from "@/components/LinkButton";
import PageTitle from "@/components/PageTile";
import RoomModel from "@/models/room-model";
import React from "react";
import RoomsTable from "./_common/rooms-table";

const RoomsPage = async () => {
  const response = await RoomModel.find()
    .populate("hotel")
    .sort({ createdAt: -1 });
  const rooms = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Rooms" />
        <LinkButton path="/admin/rooms/add" title="Add Room" />
      </div>

      <RoomsTable rooms={rooms} />
    </div>
  );
};

export default RoomsPage;
