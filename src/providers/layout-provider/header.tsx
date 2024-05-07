import { UserType } from "@/interfaces";
import React from "react";
import ProjectTitle from "./project-title";
import { Button } from "antd";
import UserInfo from "./userInfo";

const Header = ({ loggedInData }: { loggedInData: UserType | null }) => {
  if (!loggedInData) {
    return (
      <div className="flex justify-between  items-center">
        <ProjectTitle />
        <Button type="link">Sign In </Button>
      </div>
    );
  }
  return (
    <div className=" lg:px-20 py-2">
      <div className="flex justify-between  items-center border-t-0 border-solid cursor-pointer">
        <ProjectTitle />
        <UserInfo loggedInData={loggedInData} />
      </div>
    </div>
  );
};

export default Header;
