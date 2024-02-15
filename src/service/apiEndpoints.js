const BASE_URL = "http://localhost:4000/api/v1";

// AUTH ENDPOINTS
export const endpoints = {
  SIGNUP_API: BASE_URL + "/auth/register",
  LOGIN_API: BASE_URL + "/auth/login",
  ADD_AMOUNT: BASE_URL + "/account/addAmount",
  GET_ALL_TRANSACTIONS: BASE_URL + "/account/getAllTransactions",
  TRANSFER_AMOUNT: BASE_URL + "/account/transferAmount",
  GET_TOTAL_BALANCE: BASE_URL + "/account/totalBalance",
};
