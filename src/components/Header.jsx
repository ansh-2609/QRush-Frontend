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
    {/* HEADER */}
    <header className="
      flex items-center justify-between 
      px-3 sm:px-6 py-2 
      bg-gradient-to-r from-blue-900 to-slate-900 
      shadow-lg border-b border-white/10 
      relative z-40
    ">
      
      {/* logo */}
      <div className="flex items-center flex-shrink-0">
        <Link to="/">
          <img
            src="/images/QRush3.png"
            alt="QRush Logo"
            className="h-14 sm:h-16 md:h-18 w-auto hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>

      {/* desktop navigation */}
      {isLoggedIn && (
        <nav className="hidden lg:flex items-center space-x-2 xl:space-x-8 text-gray-300 font-medium">
          <Link 
            to="/categories" 
            className="px-3 py-2 hover:bg-white text-white hover:text-black rounded-lg transition-colors"
          >
            Categories
          </Link>
          <Link 
            to="/quiz-type" 
            className="px-3 py-2 hover:bg-white text-white hover:text-black rounded-lg transition-colors"
          >
            Quiz Types
          </Link>
          <Link 
            to="/badges" 
            className="px-3 py-2 hover:bg-white text-white hover:text-black rounded-lg transition-colors"
          >
            Badges
          </Link>
        </nav>
      )}

      {/* desktop Auth Buttons */}
      {!isLoggedIn && (
        <div className="hidden lg:flex items-center space-x-3 shrink-0">
          <button
            className="
              px-3 sm:px-4 py-2 
              text-white bg-blue-600/20 backdrop-blur-sm 
              rounded-xl font-medium hover:bg-blue-500/30 
              border border-blue-400/30 transition-colors cursor-pointer
            "
            onClick={handleSignUp}
          >
            Sign Up
          </button>

          <button
            className="
              px-3 sm:px-4 py-2 
              text-white bg-blue-600 rounded-xl font-medium 
              hover:bg-blue-700 transition-colors cursor-pointer
            "
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      )}

      {/* desktop logout*/}
      {isLoggedIn && (
        <div className="hidden lg:flex shrink-0">
          <button
            className="
              px-3 sm:px-4 py-2 
              text-white bg-blue-600 rounded-xl font-medium 
              hover:bg-blue-700 transition-colors cursor-pointer
            "
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden flex items-center text-white ml-2 cursor-pointer"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
      </button>
    </header>

    {/* MOBILE MENU */}
    {mobileMenuOpen && (
      <div
        className="
          fixed top-[72px] sm:top-[80px] left-0 right-0 
          bg-gradient-to-r from-blue-900 to-slate-900 
          shadow-lg lg:hidden z-30 
          max-h-[70vh] overflow-y-auto
        "
      >
        
        {/* Mobile Nav Links */}
        {isLoggedIn && (
          <nav className="flex flex-col px-4 py-3 space-y-2 border-b border-white/10">
            <Link 
              to="/categories" 
              onClick={() => setMobileMenuOpen(false)} 
              className="px-3 py-2 text-white hover:bg-blue-800 rounded-lg transition-colors"
            >
              Categories
            </Link>
            <Link 
              to="/quiz-type" 
              onClick={() => setMobileMenuOpen(false)} 
              className="px-3 py-2 text-white hover:bg-blue-800 rounded-lg transition-colors"
            >
              Quiz Types
            </Link>
            <Link 
              to="/badges" 
              onClick={() => setMobileMenuOpen(false)} 
              className="px-3 py-2 text-white hover:bg-blue-800 rounded-lg transition-colors"
            >
              Badges
            </Link>
          </nav>
        )}

        {/* Mobile Auth Buttons */}
        <div className="flex flex-col px-4 py-3 space-y-2">

          {!isLoggedIn && (
            <>
              <button
                className="
                  w-full px-4 py-2 
                  text-white bg-blue-600/20 backdrop-blur-sm 
                  rounded-xl font-medium hover:bg-blue-500/30 
                  border border-blue-400/30 transition-colors cursor-pointer
                "
                onClick={handleSignUp}
              >
                Sign Up
              </button>

              <button
                className="
                  w-full px-4 py-2 text-white bg-blue-600 
                  rounded-xl font-medium hover:bg-blue-700 transition-colors cursor-pointer
                "
                onClick={handleLogin}
              >
                Login
              </button>
            </>
          )}

          {isLoggedIn && (
            <button
              className="
                w-full px-4 py-2 text-white bg-blue-600 
                rounded-xl font-medium hover:bg-blue-700 transition-colors cursor-pointer
              "
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
