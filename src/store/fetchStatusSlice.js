import { createSlice } from "@reduxjs/toolkit";

const fetchStatusSlice = createSlice({
  name: "fetchStatus",
  initialState: {
    fetchDone: false,
    currentfetching: false,
  },
  reducers: {
    markFetchDone: (state) => {
      state.fetchDone = true;
    },
    markFetchingStart: (state) => {
      state.currentfetching = true;
    },
    markFetchingFinish: (state) => {
      state.currentfetching = false;
    },
  },
});

export const fetchStatusActions = fetchStatusSlice.actions;

export default fetchStatusSlice;
