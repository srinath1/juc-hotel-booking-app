"use client";
import React, { useState, useEffect } from "react";
import Header from "./header";
import { UserType } from "@/interfaces";
import { getCurrentUserFromMongoDB } from "@/server-actions/users";
import { usePathname } from "next/navigation";
import Spinner from "@/components/Spinner";
import { message } from "antd";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInData, setLoggedIndata] = useState<UserType | null>(null);
  const pathname = usePathname();
  const isAuthRoute =
    pathname.includes("/sign-in") || pathname.includes("/sign-up");
  const isAdminRoute = pathname.includes("/admin");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loggedInData && !isAuthRoute) {
      getUserData();
    }
  }, []);

  const getUserData = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUserFromMongoDB();
      if (response.success) {
        setLoggedIndata(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  if (isAuthRoute) {
    return children;
  }
  if (loading) {
    return <Spinner fullHeight />;
  }
  if (loggedInData && isAdminRoute && !loggedInData.isAdmin) {
    return (
      <div className=" px-5 lg:px-20 mt-10">
        <Header loggedInData={loggedInData} />
        <div className="text-center text-gray-500 mt-20 px-5 lg:px-20 py-20 font-bold text-5xl">
          Unauthorized access
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header loggedInData={loggedInData} />
      <div className=" px-5 lg:px-20 mt-10">{children}</div>
    </div>
  );
};

export default LayoutProvider;
