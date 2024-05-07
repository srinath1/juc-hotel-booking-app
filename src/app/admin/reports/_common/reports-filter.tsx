"use client";
import { Button } from "antd";
import { FilterIcon, FilterX, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
const ReportsFilter = ({ searchParams }: { searchParams: any }) => {
  const [startDate, setStartDate] = React.useState(
    searchParams.startDate || ""
  );
  const router = useRouter();
  const [endDate, setEndDate] = React.useState(searchParams.endDate || "");
  const onGetData = () => {
    const newSearchParamsObject = { ...searchParams, startDate, endDate };
    const newSearchParams = new URLSearchParams(
      newSearchParamsObject
    ).toString();
    router.push(`/admin/reports?${newSearchParams}`);
  };
  const onClear = () => {
    setStartDate("");
    setEndDate("");
    router.push("/admin/reports");
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-7 items-end">
      <div className="flex flex-col">
        <span className="text-gray-500 text-sm mb-2 font-bold">Start Date</span>
        <input
          placeholder="check-in"
          className="h-14 px-10 w-full bg-gray-100 border-gray-500 outline-none"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-gray-500 text-sm mb-2 font-bold">End Date</span>
        <input
          placeholder="check-in"
          className="h-14 px-10 w-full bg-gray-100 border-gray-500 outline-none"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="flex gap-5 mt-4 ">
        <Button
          type="default"
          className="h-14 w-48 px-10 flex items-center"
          icon={<FilterX size={20} />}
          onClick={onClear}
        >
          Clear
        </Button>
        <Button
          type="primary"
          className="h-14 w-48 px-10  flex items-center"
          icon={<Search size={20} />}
          onClick={onGetData}
          disabled={!startDate || !endDate}
        >
          Get Report
        </Button>
      </div>
    </div>
  );
};

export default ReportsFilter;
