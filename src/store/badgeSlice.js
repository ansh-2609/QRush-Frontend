import { createSlice } from "@reduxjs/toolkit";

const badgeSlice = createSlice({ 
  name: "badge",
  initialState: {
    badges: [],
  },
  reducers: {

    setBadges: (state, action) => {
      state.badges = action.payload;
    },
  },
});

export const { setBadges } = badgeSlice.actions;
export default badgeSlice;
