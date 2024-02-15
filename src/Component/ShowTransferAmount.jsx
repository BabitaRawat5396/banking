import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTransactions } from "../service/operations/transactionAPI";
import Loader from "./Loader";
import Transaction from "./Transaction";

const ShowTransferAmount = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.transaction);
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const result = await fetchAllTransactions(dispatch, token);
        setAllTransactions(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTransactions();
  }, []);
  return (
    <div className="h-full w-full flex justify-center pt-10">
      {loading ? (
        <Loader />
      ) : (
        <div className="transactions">
          {allTransactions?.map((trans) => (
            <Transaction key={trans._id} transaction={trans} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowTransferAmount;
