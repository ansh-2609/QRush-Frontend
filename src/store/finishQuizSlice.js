
import { createSlice } from "@reduxjs/toolkit";

const finishQuizSlice = createSlice({
  name: "finishQuiz",
  initialState: {
    questions: [],
    score: 0,
    submitted: false,
    category: "",
    subcategory: "",
    currentQuestionIndex: 0,
    lives: 3,
    usedHint: false,
    isGameOver: false,
  },
  reducers: {
    submitAnswer: (state, action) => {
      const useranswer = action.payload;

      state.score = 0;

      state.questions.forEach((element, index) => {
        const key = `answer${index}`;
        if(useranswer[key]?.toLowerCase().trim() === element.answer.toLowerCase().trim()){
          state.score += 1;
        }
      });

      state.submitted = true;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
      state.questions = [];
      state.score = 0;
      state.submitted = false;
      state.currentQuestionIndex = 0;
      state.lives = 3;
      state.usedHint = false;
      state.isGameOver = false;
    },

    setSubCategory: (state, action) => {
      state.subcategory = action.payload;
      state.questions = [];
      state.score = 0;
      state.submitted = false;
      state.currentQuestionIndex = 0;
      state.lives = 3;
      state.usedHint = false;
      state.isGameOver = false;
    },

    setQuestions: (state, action) => {
      state.questions = action.payload;
      state.currentQuestionIndex = 0;
      state.score = 0;
      state.submitted = false;
      state.lives = 3;
      state.usedHint = false;
      state.isGameOver = false;
    },

    useHint: (state) => {
      state.usedHint = true;
    },

    checkAnswer: (state, action) => {
      const userAnswer = action.payload;
      const currentQuestion = state.questions[state.currentQuestionIndex];

      if (!currentQuestion || state.isGameOver) return;

      const isCorrect =
        userAnswer.trim().toLowerCase() ===
        currentQuestion.answer.trim().toLowerCase();

      if (isCorrect) {
        state.score += state.usedHint ? 5 : 10;
      } else {
        state.lives -= 1;
        if (state.lives <= 0) {
          state.isGameOver = true;
        }
      }

      // Reset hint for next question
      state.usedHint = false;
    },

    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      } else {
        state.submitted = true;
        state.isGameOver = true;
      }
    },

    resetGame: (state) => {
      state.score = 0;
      state.currentQuestionIndex = 0;
      state.lives = 3;
      state.usedHint = false;
      state.isGameOver = false;
      state.submitted = false;
    },
  },
});

export const {
  setQuestions,
  checkAnswer,
  nextQuestion,
  setCategory,
  setSubCategory,
  useHint,
  resetGame,
  submitAnswer,
} = finishQuizSlice.actions;

export default finishQuizSlice;
