import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setSignupInfo } from "../../services/appServices";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword:"",
  });

  const [errormessages, setErrorMessages] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessages([]);
      try {
        const response = await setSignupInfo(formData);
        if(response.success) {
          navigate('/login');
        }
        else{
          const errors = Array.isArray(response.errorMessages)
          ? response.errorMessages
          : [response.errorMessages];

          setErrorMessages(errors);
        }
      } catch (error) {
        console.error('Signup failed:', error);
      }
    };

  return (
    <div className="flex justify-center pt-5 bg-gradient-to-br min-h-screen from-blue-100 to-blue-300">
      <div className="bg-white p-8 mb-4 rounded-2xl shadow-lg w-full max-w-md h-fit">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Create Your Account
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
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1 ml-2">
              You can enter your own password and remember it.
            </p>
          </div>
          

          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm your password"
            value={formData.confirmpassword}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;