import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState: initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = transactionSlice.actions;

export default transactionSlice.reducer;
