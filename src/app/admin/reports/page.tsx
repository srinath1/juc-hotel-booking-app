import PageTitle from "@/components/PageTile";
import React, { Suspense } from "react";
import ReportsFilter from "./_common/reports-filter";
import ReportsData from "./_common/reports-data";
import Spinner from "@/components/Spinner";

const Reportspage = ({ searchParams }: { searchParams: any }) => {
  const suspensekey = JSON.stringify(searchParams);
  return (
    <div>
      <PageTitle title="Reports" />
      <ReportsFilter searchParams={searchParams} />
      <Suspense key={suspensekey} fallback={<Spinner fullHeight />}>
        <ReportsData searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default Reportspage;
