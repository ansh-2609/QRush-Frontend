import { createSlice } from "@reduxjs/toolkit";

const escapeRoomSlice = createSlice({
  name: "escapeRoom",
  initialState: {
    questions: [],
    category: '', 
    subcategory:'',
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.questions = [];
    },
    setSubCategory: (state, action) => {
      state.subcategory = action.payload;
      state.questions = [];
    },

    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
});
    
export const { setQuestions, setCategory, setSubCategory} = escapeRoomSlice.actions;
export default escapeRoomSlice;