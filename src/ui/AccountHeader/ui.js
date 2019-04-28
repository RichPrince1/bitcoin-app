import React from "react";
import { MdAccountBox } from "react-icons/md";

import { Menu } from "ui/App/routes";

const AccountHeader = ({ user }) => (
  <div className="flex account-header end">
    <Menu />
    <span className="flex-around greeting">
      <MdAccountBox size={30} />
      <span className="user"> Hi, {user.name} </span>
    </span>
  </div>
);

export default AccountHeader;
