import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import quizReducer from "./quizSlice";
import fetchStatusSlice from "./fetchStatusSlice";
import finishQuizSlice from "./finishQuizSlice";
import imageQuizSlice from "./imageQuizSlice";
import authSlice from "./authSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, quizReducer);
const persistedImageQuizReducer = persistReducer(persistConfig, imageQuizSlice.reducer);
const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const store = configureStore({
  reducer: {
    quiz : persistedReducer,
    fetchStatus: fetchStatusSlice.reducer,
    finishQuiz : finishQuizSlice.reducer,
    imageQuiz: persistedImageQuizReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
