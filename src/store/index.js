import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import quizReducer from "./quizSlice";
import fetchStatusSlice from "./fetchStatusSlice";
import finishQuizSlice from "./finishQuizSlice";
import imageQuizSlice from "./imageQuizSlice";
import authSlice from "./authSlice";
import escapeRoomSlice from "./escapeRoomSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, quizReducer);
const persistedImageQuizReducer = persistReducer(persistConfig, imageQuizSlice.reducer);
const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);
const persistedEscapeRoomReducer = persistReducer(persistConfig, escapeRoomSlice.reducer);

export const store = configureStore({
  reducer: {
    quiz : persistedReducer,
    fetchStatus: fetchStatusSlice.reducer,
    finishQuiz : finishQuizSlice.reducer,
    imageQuiz: persistedImageQuizReducer,
    auth: persistedAuthReducer,
    escapeRoom: persistedEscapeRoomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
