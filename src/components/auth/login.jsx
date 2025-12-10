import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLoginInfo } from "../../services/appServices";
import { login, setUserId} from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errormessages, setErrorMessages] = useState([]);

  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await setLoginInfo(credentials);
      if(response.success) {
        
        dispatch(login());
        dispatch(setUserId(response.user.id));
        navigate('/'); 
      }
      else{
          const errors = response.message;
          setErrorMessages(errors);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessages(["An unexpected error occurred. Please try again later."]);
    }
  };

  return (
    <div className="flex justify-center pt-5 bg-gradient-to-br min-h-screen from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md h-fit">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Welcome Back
        </h2>
        {errormessages.length > 0 && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
            <ul className="list-disc pl-5 space-y-1">
              {errormessages.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={credentials.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
