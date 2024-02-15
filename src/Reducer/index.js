import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slice/authSlice";
import transactionReducer from "../Slice/transactionSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  transaction: transactionReducer,
});

export default rootReducer;
