import { UserType } from "@/interfaces";
import { Drawer } from "antd";
import React from "react";
import {
  BedDouble,
  GitGraph,
  Home,
  Hotel,
  List,
  User,
  User2,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
const Sidebar = ({
  showSideBar,
  setShowSidebar,
  loggedInData,
}: {
  showSideBar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  loggedInData: UserType | null;
}) => {
  const router = useRouter();
  const iconSize = 10;
  const pathname = usePathname();
  const { signOut } = useAuth();
  const userMenuItems: any[] = [
    {
      name: "Home",
      icon: <Home size={20} />,
      onClick: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      name: "Bookings",
      icon: <List size={20} />,
      onClick: () => router.push("/user/bookings"),
      isActive: pathname === "/user/bookings",
    },
    {
      name: "Profile",
      icon: <User size={20} />,
      onClick: () => router.push("/user/profile"),
      isActive: pathname === "/user/profile",
    },
  ];
  const adminMenuItems: any[] = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      onClick: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      name: "Bookings",
      icon: <List size={iconSize} />,
      onClick: () => router.push("/admin/bookings"),
      isActive: pathname === "/admin/bookings",
    },
    {
      name: "Hotels",
      icon: <Hotel size={iconSize} />,
      onClick: () => router.push("/admin/hotels"),
      isActive: pathname.includes("/admin/hotels"),
    },
    {
      name: "Rooms",
      icon: <BedDouble size={iconSize} />,
      onClick: () => router.push("/admin/rooms"),
      isActive: pathname === "/admin/rooms",
    },
    {
      name: "Reports",
      icon: <GitGraph size={iconSize} />,
      onClick: () => router.push("/admin/reports"),
      isActive: pathname === "/admin/reports",
    },
    {
      name: "Users",
      icon: <User2 size={iconSize} />,
      onClick: () => router.push("/admin/users"),
      isActive: pathname === "/admin/users",
    },
  ];
  const menuItemsToShow: any[] = loggedInData?.isAdmin
    ? adminMenuItems
    : userMenuItems;

  const onLogout = async () => {
    await signOut();
    setShowSidebar(false);
    router.push("/sign-in");
  };

  return (
    <Drawer open={showSideBar} onClose={() => setShowSidebar(false)} closable>
      <div className="flex flex-col gap-10">
        {menuItemsToShow.map((item, index) => {
          return (
            <div
              className={`flex gap-4 items-center text-gray-700 cursor-pointer px-10 py-3 text-base ${
                item.isActive ? "bg-gray-800 text-white" : ""
              }`}
              key={index}
              onClick={() => {
                item.onClick();
                setShowSidebar(false);
              }}
            >
              {item.icon}
              <span className="mt-[2px]">{item.name}</span>
            </div>
          );
        })}
        <span
          className="text-center cursor-pointer text-base text-red-500"
          onClick={onLogout}
        >
          Logout
        </span>
      </div>
    </Drawer>
  );
};

export default Sidebar;
