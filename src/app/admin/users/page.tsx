import PageTitle from "@/components/PageTile";
import UserModel from "@/models/user-model";
import React from "react";
import UsersTable from "./_common/users-table";

const UsersPage = async () => {
  const response = await UserModel.find().sort({ createdAt: -1 });
  const users = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <PageTitle title="users" />
      <UsersTable users={users} />
    </div>
  );
};

export default UsersPage;
