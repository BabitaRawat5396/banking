import React from "react";
import { convertToStandardDate } from "../Utility/dateFormat";

const Transaction = ({ transaction }) => {
  return (
    <div className="transactions__row">
      <div
        className={`transactions__type transactions__type--${transaction.transactionType}`}
      >
        {transaction.transactionType}
      </div>
      <div
        className={`transactions__type transactions__type--${transaction.accountType}`}
      >
        {transaction.accountType}
      </div>
      <div className="transactions__value">${transaction.amount}</div>
      <div className="transactions__date">
        {convertToStandardDate(transaction.createdAt)}
      </div>
    </div>
  );
};

export default Transaction;
