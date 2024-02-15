import React, { useEffect, useState } from "react";
import { getFormattedDate } from "../Utility/dateFormat";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { fetchTotalBalance } from "../service/operations/transactionAPI";

const AccountDetails = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [totalBalance, setTotalBalance] = useState(0);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetchTotalBalance(dispatch);
        setTotalBalance(result);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="p-10">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <h2 className="text-2xl pl-4">
            {user?.firstName} {user?.lastName}
          </h2>
          <div className="balance">
            <div>
              <p className="balance__label">Current balance</p>
              <p className="balance__date">
                As of <span className="date">{getFormattedDate()}</span>
              </p>
            </div>
            <p className="balance__value">₹ {totalBalance && totalBalance}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDetails;
