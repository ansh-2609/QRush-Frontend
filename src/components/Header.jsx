
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { setLogoutInfo } from "../services/appServices";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    navigate("/login");
  };

  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogout = async() => {

    const response = await setLogoutInfo();

    if(response.success){
      dispatch(logout());
      navigate("/");
    }
  }

  return (
    <header className="flex items-center justify-between px-6 py-2 bg-gradient-to-r from-blue-900 to-slate-900 shadow-lg border-b border-white/10">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img
            src="/images/QRush3.png"
            alt="QRush Logo"
            className="h-18 w-auto hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>

      {/* Navigation */}
      {isLoggedIn && (
      <nav className="hidden md:flex space-x-8 text-gray-300 font-medium">
        <span className="p-2 hover:bg-white text-white hover:text-black rounded-lg transition-colors duration-200">
          <Link to="/categories">Categories</Link>
        </span>
        <span className="p-2 hover:bg-white text-white hover:text-black rounded-lg transition-colors duration-200">
          <Link to="/quiz-type">Quiz Types</Link>
        </span>
        <span className="p-2 hover:bg-white text-white hover:text-black rounded-lg transition-colors duration-200">
          <Link to="/badges">Badges</Link>
        </span>
        <span className="p-2 hover:bg-white text-white hover:text-black rounded-lg transition-colors duration-200">
          <Link to="#">Create Quiz</Link>
        </span>
        <span className="p-2 hover:bg-white text-white hover:text-black rounded-lg transition-colors duration-200">
          <Link to="#">Study</Link>
        </span>
      </nav>
      )}

      {/* Auth Buttons */}
      {!isLoggedIn && (
      <div className="flex items-center space-x-3">
        <button
          className="px-4 py-2 text-white bg-blue-600/20 backdrop-blur-sm rounded-xl font-medium 
                     hover:bg-blue-500/30 transition-colors duration-200 cursor-pointer 
                     border border-blue-400/30"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded-xl font-medium 
                     hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      )}
      {isLoggedIn && (
      <div className="flex items-center space-x-3">
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded-xl font-medium 
                     hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      )}
    </header>
  );
};

export default Header;
