import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { setLogoutInfo } from "../services/appServices";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

  const handleSignUp = () => {
    navigate("/signup");
    setMobileMenuOpen(false);
  };

  const handleLogout = async() => {
    const response = await setLogoutInfo();
    if(response.success){
      dispatch(logout());
      navigate("/");
      setMobileMenuOpen(false);
    }
  }

  return (
    <>
      <header className="flex items-center justify-between px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-900 to-slate-900 shadow-lg border-b border-white/10 relative z-40">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/">
            <img
              src="/images/QRush3.png"
              alt="QRush Logo"
              className="h-16 sm:h-18 w-auto hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        {isLoggedIn && (
        <nav className="hidden lg:flex space-x-2 xl:space-x-8 text-gray-300 font-medium">
          <Link to="/categories" className="px-2 lg:px-3 py-2 hover:bg-white text-white hover:text-black rounded-lg transition-colors duration-200">
            Categories
          </Link>
          <Link to="/quiz-type" className="px-2 lg:px-3 py-2 hover:bg-white text-white hover:text-black rounded-lg transition-colors duration-200">
            Quiz Types
          </Link>
          <Link to="/badges" className="px-2 lg:px-3 py-2 hover:bg-white text-white hover:text-black rounded-lg transition-colors duration-200">
            Badges
          </Link>
          {/* <Link to="#" className="px-2 lg:px-3 py-2 hover:bg-white text-white hover:text-black rounded-lg transition-colors duration-200">
            Create Quiz
          </Link>
          <Link to="#" className="px-2 lg:px-3 py-2 hover:bg-white text-white hover:text-black rounded-lg transition-colors duration-200">
            Study
          </Link> */}
        </nav>
        )}

        {/* Desktop Auth Buttons */}
        {!isLoggedIn && (
        <div className="hidden sm:flex items-center space-x-2 sm:space-x-3">
          <button
            className="px-3 sm:px-4 py-2 text-white bg-blue-600/20 backdrop-blur-sm rounded-xl font-medium 
                       hover:bg-blue-500/30 transition-colors duration-200 cursor-pointer 
                       border border-blue-400/30"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <button
            className="px-3 sm:px-4 py-2 text-white bg-blue-600 rounded-xl font-medium 
                       hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        )}
        {isLoggedIn && (
        <div className="hidden sm:flex items-center space-x-3">
          <button
            className="px-3 sm:px-4 py-2 text-white bg-blue-600 rounded-xl font-medium 
                       hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex items-center text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </header>

      {/* Mobile Menu - Fixed positioning */}
      {mobileMenuOpen && (
      <div className="fixed top-20 left-0 right-0 bg-gradient-to-r from-blue-900 to-slate-900 shadow-lg lg:hidden z-30 max-h-96 overflow-y-auto">
        {isLoggedIn && (
        <nav className="flex flex-col px-4 py-3 space-y-2 border-b border-white/10">
          <Link to="/categories" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-white hover:bg-blue-800 rounded-lg transition-colors">
            Categories
          </Link>
          <Link to="/quiz-type" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-white hover:bg-blue-800 rounded-lg transition-colors">
            Quiz Types
          </Link>
          <Link to="/badges" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-white hover:bg-blue-800 rounded-lg transition-colors">
            Badges
          </Link>
          <Link to="#" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-white hover:bg-blue-800 rounded-lg transition-colors">
            Create Quiz
          </Link>
          <Link to="#" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-white hover:bg-blue-800 rounded-lg transition-colors">
            Study
          </Link>
        </nav>
        )}

        {/* Mobile Auth Buttons */}
        <div className="flex flex-col px-4 py-3 space-y-2">
          {!isLoggedIn && (
          <>
            <button
              className="w-full px-4 py-2 text-white bg-blue-600/20 backdrop-blur-sm rounded-xl font-medium 
                         hover:bg-blue-500/30 transition-colors duration-200 
                         border border-blue-400/30"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
            <button
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-xl font-medium 
                         hover:bg-blue-700 transition-colors duration-200"
              onClick={handleLogin}
            >
              Login
            </button>
          </>
          )}
          {isLoggedIn && (
            <button
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-xl font-medium 
                         hover:bg-blue-700 transition-colors duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
      )}
    </>
  );
};

export default Header;
