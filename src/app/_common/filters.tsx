"use client";
import { Button } from "antd";
import { FilterIcon, FilterX, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Filters = ({ searchParams }: { searchParams: any }) => {
  const [checkIn, setCheckIn] = React.useState(searchParams.checkIn || "");
  const [checkOut, setCheckOut] = React.useState(searchParams.checkOut || "");
  const [type, setType] = React.useState(searchParams.type || "");
  const router = useRouter();

  const onSearch = () => {
    const newSearchParamsObject = { ...searchParams, checkIn, checkOut, type };
    const newSearchParams = new URLSearchParams(
      newSearchParamsObject
    ).toString();
    router.push(`/?${newSearchParams}`);
  };
  const onClear = () => {
    setCheckIn("");
    setCheckOut("");
    setType("");
    router.push("/");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-7 items-end">
      <div className="flex flex-col">
        <span className="text-gray-500 text-sm mb-2 font-bold">
          Check In Date
        </span>
        <input
          placeholder="check-in"
          className="h-14 px-10 w-full bg-gray-100 border-gray-500 outline-none"
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-gray-500 text-sm mb-2 font-bold">
          Check Out Date
        </span>
        <input
          placeholder="check-in"
          className="h-14 px-10 w-full bg-gray-100 border-gray-500 outline-none"
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-gray-500 text-sm mb-2">Type</span>
        <select
          className="h-14 px-10 w-full bg-gray-100 border-gray-500 outline-none"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All</option>

          <option value="delux">Delux</option>
          <option value="premium">Premium</option>

          <option value="standard">Standard</option>
        </select>
      </div>
      <div className="flex gap-5 mt-4 ">
        <Button
          type="default"
          className="h-14 w-32 px-10 flex items-center"
          icon={<FilterX size={20} />}
          onClick={onClear}
        >
          Clear
        </Button>
        <Button
          type="primary"
          className="h-14 w-32 px-10  flex items-center"
          icon={<Search size={20} />}
          onClick={onSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Filters;
