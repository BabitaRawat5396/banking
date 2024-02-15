import { setLoading } from "../../Slice/transactionSlice";
import { apiConnector } from "../apiConnecter";
import { endpoints } from "../apiEndpoints";
import { toast } from "react-hot-toast";

const { ADD_AMOUNT, GET_ALL_TRANSACTIONS, TRANSFER_AMOUNT, GET_TOTAL_BALANCE } =
  endpoints;

export function addAmount(formData, token) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector("POST", ADD_AMOUNT, formData, {
        Authorization: `Bearer ${token}`,
      });

      console.log("ADD AMOUNT API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Transaction Successful");
    } catch (error) {
      console.log("ADD AMOUNT API ERROR............", error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function transferAmount(formData, token) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector("POST", TRANSFER_AMOUNT, formData, {
        Authorization: `Bearer ${token}`,
      });

      console.log("TRANSFER_AMOUNT API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Transaction Successful");
    } catch (error) {
      console.log("TRANSFER_AMOUNT API ERROR............", error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export const fetchAllTransactions = async (dispatch, token) => {
  let result;
  try {
    dispatch(setLoading(true));

    const response = await apiConnector("GET", GET_ALL_TRANSACTIONS, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    // console.log("GET_ALL_TRANSACTIONS response", response);
    result = response.data.allTransactions;
  } catch (error) {
    console.log("GET_ALL_TRANSACTIONS error", error);
    toast.error(error.response.data.message);
  } finally {
    dispatch(setLoading(false));
  }

  return result;
};

export const fetchTotalBalance = async (dispatch) => {
  let result;
  try {
    dispatch(setLoading(true));

    const response = await apiConnector("GET", GET_TOTAL_BALANCE, null);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    console.log("GET_TOTAL_BALANCE response", response);
    result = response.data.totalBalance;
  } catch (error) {
    console.log("GET_TOTAL_BALANCE error", error);
    toast.error(error.response.data.message);
  } finally {
    dispatch(setLoading(false));
  }

  return result;
};
