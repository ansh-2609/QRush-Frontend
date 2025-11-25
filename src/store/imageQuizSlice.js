import { createSlice } from "@reduxjs/toolkit";

const imageQuizSlice = createSlice({
  name: "imageQuiz",
  initialState: {
    questions: [],
    score:0,
    currentQuestionIndex: 0,
    submitted: false,
    category: '', 
    subcategory:'',
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.questions = [];
      state.score = 0;
      state.currentQuestionIndex = 0;
      state.submitted = false;
    },
    setSubCategory: (state, action) => {
      state.subcategory = action.payload;
      state.questions = [];
      state.score = 0;
      state.currentQuestionIndex = 0;
      state.submitted = false;
    },

    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    nextQuestion: (state) => {
      state.currentQuestionIndex += 1;
    },
    submitAnswer: (state, action) => {
      state.score = action.payload;
    },
    setSubmitted: (state, action) => {
      state.submitted = action.payload;
    }
  },
});

export const { setQuestions, submitAnswer, setCategory, setSubCategory, setSubmitted, nextQuestion} = imageQuizSlice.actions;

export default imageQuizSlice;
