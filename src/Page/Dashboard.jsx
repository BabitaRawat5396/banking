import React, { useState } from "react";
import AddMoneyInputField from "../Component/AddMoneyInputField";
import ShowTransferAmount from "../Component/ShowTransferAmount";
import TransferButton from "../Component/TransferButton";
import AccountDetails from "../Component/AccountDetails";

const Dashboard = () => {
  return (
    <div>
      <AccountDetails />
      <h1 className="text-center font-bold text-2xl pt-10 border-b-2 px-20 w-[90%] mx-auto">Transactions</h1>
      <ShowTransferAmount />
      <div className="flex ">
        <AddMoneyInputField />
        <TransferButton />
      </div>
    </div>
  );
};

export default Dashboard;
