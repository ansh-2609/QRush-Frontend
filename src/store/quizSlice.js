import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({ 
  name: "quiz",
  initialState: {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    isFinished: false,
    category: '',
  },
  reducers: {
    setCategory: (state, action) => {
      console.log("Setting category:", action.payload);
      state.category = action.payload;
      // Reset quiz state when category changes
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.score = 0;
      state.isFinished = false;
    },
    setQuestions: (state, action) => {
      console.log("Setting questions:", action.payload);
      console.log("Setting questions 0:", action.payload[0]);
      state.questions = action.payload;
    },
    nextQuestion: (state) => {
      state.currentQuestionIndex += 1;
    },
    submitAnswer: (state, action) => {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      if ((action.payload) === (currentQuestion.answer)) {
        state.score += 1;
      }
    },
    setFinished: (state, action) => {
      state.isFinished = action.payload;
    },
  },
});

export const { setQuestions, nextQuestion, submitAnswer, setFinished, setCategory } = quizSlice.actions;

export default quizSlice.reducer;
