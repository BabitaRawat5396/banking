import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transferAmount } from "../service/operations/transactionAPI";

const TransferButton = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    amount: "",
    accountType: "",
  });

  // Destructuring formData
  const { amount, accountType } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(transferAmount(formData, token));
    setFormData({
      amount: "",
      accountType: "",
    });
  };
  return (
    <div className="operation operation--transfer">
      <h2>Transfer money</h2>
      <form onSubmit={handleSubmit} className="operation_form form--transfer">
        <select
          name="accountType"
          value={accountType}
          onChange={handleOnChange}
          className="form__input form__input--to"
        >
          <option value="" disabled>
            AccountType
          </option>
          <option value="Checking">Checking</option>
          <option value="Savings">Savings</option>
        </select>
        <input
          name="amount"
          value={amount}
          onChange={handleOnChange}
          type="number"
          className="form__input form__input--amount"
        />
        <button className="form__btn form__btn--transfer">&rarr;</button>
        <label className="form__label">Transfer to</label>
        <label className="form__label">Amount</label>
      </form>
    </div>
  );
};

export default TransferButton;
