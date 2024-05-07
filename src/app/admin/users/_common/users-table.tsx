"use client";
import { UserType } from "@/interfaces";
import { updateUserRole } from "@/server-actions/users";
import { Table, message } from "antd";
import React from "react";
import dayjs from "dayjs";

const UsersTable = ({ users }: { users: UserType[] }) => {
  const [loading, setLoading] = React.useState(false);
  const onRoleChange = async (userId: string, isAdmin: boolean) => {
    try {
      setLoading(true);
      const response = await updateUserRole(userId, isAdmin);
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "user ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Joined On",
      dataIndex: "createdAt",
      render: (value: string) => {
        return dayjs(value).format("MMM DD,YYYY hh:mm:A");
      },
      key: "createdAt",
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      render: (isAdmin: boolean, user: UserType) => {
        return (
          <select
            className="border border-gray-300 rounded-md py-3 px-7"
            onChange={(e) => onRoleChange(user._id, e.target.value === "admin")}
          >
            <option value="admin" selected={isAdmin}>
              Admin
            </option>
            <option value="user" selected={!isAdmin}>
              User
            </option>
          </select>
        );
      },
    },
  ];

  return <Table dataSource={users} columns={columns} loading={loading} />;
};

export default UsersTable;
