// import { useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import LoadingScreen from "../components/LoadingScreen";
// import { setAuthStatus } from "../store/authSlice";
// import { checkAuthStatus } from "../services/appServices";

// function App() {
//   const dispatch = useDispatch();
//   const fetchStatus = useSelector((store) => store.fetchStatus);

//   const isLoading = fetchStatus.fetchDone;

//   useEffect(() => {
//     const verifyAuth = async () => {
//       try {
//         const response = await checkAuthStatus();
//         dispatch(setAuthStatus(response.isLoggedIn));
//       } catch (error) {
//         console.error("Auth verification failed:", error);
//       }
//     };

//     verifyAuth();
//   }, [dispatch]);

//   return (
//     <>
//       <div className="flex flex-col min-h-screen">
//         <Header />
//         <main className="flex-grow">
//           <Outlet /> 
//         </main>
//         <Footer />
//       </div>
//     </>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import { setAuthStatus, setUserId } from "../store/authSlice";
import { checkAuthStatus } from "../services/appServices";

function App() {
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await checkAuthStatus();
        dispatch(setAuthStatus(response.isLoggedIn));
        if (response.userId) {
          dispatch(setUserId(response.userId));
        }
      } catch (error) {
        console.error("Auth verification failed:", error);
        dispatch(setAuthStatus(false));
      } finally {
        setIsChecking(false);
      }
    };

    verifyAuth();
  }, [dispatch]);

  if (isChecking) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Outlet /> 
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
