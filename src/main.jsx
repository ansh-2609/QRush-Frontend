// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './routes/App.jsx'
// import { PersistGate } from "redux-persist/integration/react";
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Home from './routes/Home.jsx';
// import Categories from './components/categories/Categories.jsx';
// import {store, persistor} from './store/index.js';
// import { Provider } from 'react-redux';
// import QuizTypes from './components/QuizTypes.jsx';
// import FinishTheTypes from './components/finishthetype/FinishTheType.jsx';
// import Finished from './components/finishthetype/Finished.jsx';
// import IdentifyFromImage from './components/identifyfromimg/IdentifyFromImg.jsx';
// import QuizResults from './components/identifyfromimg/QuizResult.jsx';
// import EscapeRoomGame from './components/escapePuzzle/escapePuzzle.jsx';
// import Badges from './components/Badges.jsx';
// import Signup from './components/auth/signup.jsx';
// import Login from './components/auth/login.jsx';
// import CategoryContent from './components/categories/CategoryContent.jsx';
// import FinishTheTypeContent from './components/finishthetype/FinishTheTypeContent.jsx';
// import IdentifyFromImgContent from './components/identifyfromimg/IdentifyFromImgContent.jsx';
// import EscapeRoom from './components/EscapeRoom/EscapeRoom.jsx';
// import AncientTemplePuzzle from './components/EscapeRoom/AncientTemplePuzzle.jsx';
// import LockedLaboratoryGame from './components/EscapeRoom/LockedLaboratoryGame.jsx';
// import IslandMystery from './components/EscapeRoom/IslandMystery.jsx';
// import PrivateRoute from './components/PrivateRoute.jsx';


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },
//       {
//         path: "/signup",
//         element: <Signup />,
//       },

//       {
//         element: <PrivateRoute />,
//         children: [
//           { path: "/categories", element: <Categories /> },
//           { path: "/quiz-type", element: <QuizTypes /> },
//           { path: "/quiz-type/finish", element: <FinishTheTypes /> },
//           { path: "/quiz-type/finish/landmark", element: <FinishTheTypeContent /> },
//           { path: "/quiz-type/finish/brandname", element: <FinishTheTypeContent /> },
//           { path: "/quiz-type/finish/capitalcity", element: <FinishTheTypeContent /> },
//           { path: "/quiz-type/finish/fact", element: <FinishTheTypeContent /> },
//           { path: "/quiz-type/finish/inventor", element: <FinishTheTypeContent /> },
//           { path: "/quiz-type/finish/landmark/result", element: <Finished /> },
//           { path: "/quiz-type/finish/brandname/result", element: <Finished /> },
//           { path: "/quiz-type/finish/capitalcity/result", element: <Finished /> },
//           { path: "/quiz-type/finish/fact/result", element: <Finished /> },
//           { path: "/quiz-type/finish/inventor/result", element: <Finished /> },

//           { path: "/quiz-type/identify", element: <IdentifyFromImage /> },
//           { path: "/quiz-type/identify/landmarks", element: <IdentifyFromImgContent /> },
//           { path: "/quiz-type/identify/landmarks/result", element: <QuizResults /> },
//           { path: "/quiz-type/identify/plants", element: <IdentifyFromImgContent /> },
//           { path: "/quiz-type/identify/plants/result", element: <QuizResults /> },
//           { path: "/quiz-type/identify/cars", element: <IdentifyFromImgContent /> },
//           { path: "/quiz-type/identify/cars/result", element: <QuizResults /> },
//           { path: "/quiz-type/identify/flags", element: <IdentifyFromImgContent /> },
//           { path: "/quiz-type/identify/flags/result", element: <QuizResults /> },
//           { path: "/quiz-type/identify/animals", element: <IdentifyFromImgContent /> },
//           { path: "/quiz-type/identify/animals/result", element: <QuizResults /> },
//           { path: "/quiz-type/identify/sports", element: <IdentifyFromImgContent /> },
//           { path: "/quiz-type/identify/sports/result", element: <QuizResults /> },
//           { path: "/quiz-type/identify/instruments", element: <IdentifyFromImgContent /> },
//           { path: "/quiz-type/identify/instruments/result", element: <QuizResults /> },

//           { path: "/quiz-type/puzzled", element: <EscapeRoomGame /> },
//           { path: "/quiz-type/escape-rooms", element: <EscapeRoom /> },
//           { path: "/quiz-type/escape-rooms/escape-room-1", element: <AncientTemplePuzzle /> },
//           { path: "/quiz-type/escape-rooms/escape-room-2", element: <LockedLaboratoryGame /> },
//           { path: "/quiz-type/escape-rooms/escape-room-3", element: <IslandMystery /> },

//           { path: "/categories/planets", element: <CategoryContent /> },
//           { path: "/categories/plants", element: <CategoryContent /> },
//           { path: "/categories/animals", element: <CategoryContent /> },
//           { path: "/categories/technology", element: <CategoryContent /> },
//           { path: "/categories/science", element: <CategoryContent /> },
//           { path: "/categories/geography", element: <CategoryContent /> },
//           { path: "/categories/generalknowledge", element: <CategoryContent /> },
//           { path: "/categories/travel", element: <CategoryContent /> },

//           { path: "/badges", element: <Badges /> },
//         ],
//       },
//     ],
//   },
// ]);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
//       <RouterProvider router={router} />
//       </PersistGate>
//     </Provider>
//  </StrictMode>,
// )

import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './routes/App.jsx'; 
import PrivateRoute from './components/PrivateRoute.jsx'; 

import { store, persistor } from './store/index.js';

const Home = lazy(() => import('./routes/Home.jsx'));
const Categories = lazy(() => import('./components/categories/Categories.jsx'));
const QuizTypes = lazy(() => import('./components/QuizTypes.jsx'));
const FinishTheTypes = lazy(() => import('./components/finishthetype/FinishTheType.jsx'));
const FinishTheTypeContent = lazy(() => import('./components/finishthetype/FinishTheTypeContent.jsx'));
const Finished = lazy(() => import('./components/finishthetype/Finished.jsx'));
const IdentifyFromImage = lazy(() => import('./components/identifyfromimg/IdentifyFromImg.jsx'));
const IdentifyFromImgContent = lazy(() => import('./components/identifyfromimg/IdentifyFromImgContent.jsx'));
const QuizResults = lazy(() => import('./components/identifyfromimg/QuizResult.jsx'));
const EscapeRoomGame = lazy(() => import('./components/escapePuzzle/escapePuzzle.jsx'));
const EscapeRoom = lazy(() => import('./components/EscapeRoom/EscapeRoom.jsx'));
const AncientTemplePuzzle = lazy(() => import('./components/EscapeRoom/AncientTemplePuzzle.jsx'));
const LockedLaboratoryGame = lazy(() => import('./components/EscapeRoom/LockedLaboratoryGame.jsx'));
const IslandMystery = lazy(() => import('./components/EscapeRoom/IslandMystery.jsx'));
const Badges = lazy(() => import('./components/Badges.jsx'));
const CategoryContent = lazy(() => import('./components/categories/CategoryContent.jsx'));
const Signup = lazy(() => import('./components/auth/signup.jsx'));
const Login = lazy(() => import('./components/auth/login.jsx'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },

      {
        element: <PrivateRoute />,
        children: [
          { path: "/categories", element: <Categories /> },
          { path: "/quiz-type", element: <QuizTypes /> },

          // Finish the type
          { path: "/quiz-type/finish", element: <FinishTheTypes /> },
          { path: "/quiz-type/finish/landmark", element: <FinishTheTypeContent /> },
          { path: "/quiz-type/finish/brandname", element: <FinishTheTypeContent /> },
          { path: "/quiz-type/finish/capitalcity", element: <FinishTheTypeContent /> },
          { path: "/quiz-type/finish/fact", element: <FinishTheTypeContent /> },
          { path: "/quiz-type/finish/inventor", element: <FinishTheTypeContent /> },
          { path: "/quiz-type/finish/landmark/result", element: <Finished /> },
          { path: "/quiz-type/finish/brandname/result", element: <Finished /> },
          { path: "/quiz-type/finish/capitalcity/result", element: <Finished /> },
          { path: "/quiz-type/finish/fact/result", element: <Finished /> },
          { path: "/quiz-type/finish/inventor/result", element: <Finished /> },

          // Identify from image
          { path: "/quiz-type/identify", element: <IdentifyFromImage /> },
          { path: "/quiz-type/identify/landmarks", element: <IdentifyFromImgContent /> },
          { path: "/quiz-type/identify/landmarks/result", element: <QuizResults /> },
          { path: "/quiz-type/identify/plants", element: <IdentifyFromImgContent /> },
          { path: "/quiz-type/identify/plants/result", element: <QuizResults /> },
          { path: "/quiz-type/identify/cars", element: <IdentifyFromImgContent /> },
          { path: "/quiz-type/identify/cars/result", element: <QuizResults /> },
          { path: "/quiz-type/identify/flags", element: <IdentifyFromImgContent /> },
          { path: "/quiz-type/identify/flags/result", element: <QuizResults /> },
          { path: "/quiz-type/identify/animals", element: <IdentifyFromImgContent /> },
          { path: "/quiz-type/identify/animals/result", element: <QuizResults /> },
          { path: "/quiz-type/identify/sports", element: <IdentifyFromImgContent /> },
          { path: "/quiz-type/identify/sports/result", element: <QuizResults /> },
          { path: "/quiz-type/identify/instruments", element: <IdentifyFromImgContent /> },
          { path: "/quiz-type/identify/instruments/result", element: <QuizResults /> },

          // Escape rooms
          { path: "/quiz-type/puzzled", element: <EscapeRoomGame /> },
          { path: "/quiz-type/escape-rooms", element: <EscapeRoom /> },
          { path: "/quiz-type/escape-rooms/escape-room-1", element: <AncientTemplePuzzle /> },
          { path: "/quiz-type/escape-rooms/escape-room-2", element: <LockedLaboratoryGame /> },
          { path: "/quiz-type/escape-rooms/escape-room-3", element: <IslandMystery /> },

          // Category pages
          { path: "/categories/planets", element: <CategoryContent /> },
          { path: "/categories/plants", element: <CategoryContent /> },
          { path: "/categories/animals", element: <CategoryContent /> },
          { path: "/categories/technology", element: <CategoryContent /> },
          { path: "/categories/science", element: <CategoryContent /> },
          { path: "/categories/geography", element: <CategoryContent /> },
          { path: "/categories/generalknowledge", element: <CategoryContent /> },
          { path: "/categories/travel", element: <CategoryContent /> },

          { path: "/badges", element: <Badges /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
        <Suspense fallback={<p>Loading...</p>}>
          <RouterProvider router={router} />
        </Suspense>
      </PersistGate>
    </Provider>
  </StrictMode>
);
