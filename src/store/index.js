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
    // quiz : persistedReducer,
    quiz : quizReducer,
    fetchStatus: fetchStatusSlice.reducer,
    finishQuiz : finishQuizSlice.reducer,
    // imageQuiz: persistedImageQuizReducer,
    imageQuiz: imageQuizSlice.reducer,
    // auth: persistedAuthReducer,
    auth: authSlice.reducer,
    // escapeRoom: persistedEscapeRoomReducer,
    escapeRoom: escapeRoomSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
  //     },
  //   }),
});

// export const persistor = persistStore(store);

// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import quizReducer from "./quizSlice";
// import fetchStatusSlice from "./fetchStatusSlice";
// import finishQuizSlice from "./finishQuizSlice";
// import imageQuizSlice from "./imageQuizSlice";
// import authSlice from "./authSlice";
// import escapeRoomSlice from "./escapeRoomSlice";

// // Separate persist configs for each reducer with unique keys
// const quizPersistConfig = {
//   key: "quiz",
//   storage,
// };

// const imageQuizPersistConfig = {
//   key: "imageQuiz",
//   storage,
// };

// const authPersistConfig = {
//   key: "auth",
//   storage,
//   whitelist: ['userId'], // Only persist userId, NOT isLoggedIn
// };

// const escapeRoomPersistConfig = {
//   key: "escapeRoom",
//   storage,
// };

// // Create persisted reducers with their specific configs
// const persistedQuizReducer = persistReducer(quizPersistConfig, quizReducer);
// const persistedImageQuizReducer = persistReducer(imageQuizPersistConfig, imageQuizSlice.reducer);
// const persistedAuthReducer = persistReducer(authPersistConfig, authSlice.reducer);
// const persistedEscapeRoomReducer = persistReducer(escapeRoomPersistConfig, escapeRoomSlice.reducer);

// export const store = configureStore({
//   reducer: {
//     quiz: persistedQuizReducer,
//     fetchStatus: fetchStatusSlice.reducer,
//     finishQuiz: finishQuizSlice.reducer,
//     imageQuiz: persistedImageQuizReducer,
//     auth: persistedAuthReducer,
//     escapeRoom: persistedEscapeRoomReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
//       },
//     }),
// });

// export const persistor = persistStore(store);