import { UserType } from "@/interfaces";
import { User } from "lucide-react";
import React from "react";
import Sidebar from "./sidebar";

const UserInfo = ({ loggedInData }: { loggedInData: UserType | null }) => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  return (
    <div className="p-5 lg:border-0 lg:border-l lg:border-solid flex items-center gap-5">
      <span className="text-grat-500 text-sm">{loggedInData?.name}</span>
      <User
        className="text-gray-500"
        onClick={() => setShowSidebar(!showSidebar)}
      />
      {showSidebar && (
        <Sidebar
          showSideBar={showSidebar}
          setShowSidebar={setShowSidebar}
          loggedInData={loggedInData}
        />
      )}
    </div>
  );
};

export default UserInfo;
