import React, { useState } from "react";
import { use } from "react";
// Assuming you are using a routing library like react-router-dom
import { Link } from "react-router-dom"; 

/**
 * SignUp Component: Implements the UI for the user registration page.
 * It features the curved blue header and fields for username, email, and password.
 */
function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
 // let navigate=useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
        
        {/* Header - This section creates the curved blue background effect */}
        <div className="relative">
          {/* Blue area: large, wide, and heavily rounded at the bottom to create the curve */}
          <div className="bg-sky-500 w-[150%] h-48 absolute top-[-5rem] left-1/2 -translate-x-1/2 rounded-b-[60%] shadow-lg"></div>
          
          {/* Content overlaying the blue area */}
          <div className="relative pt-12 pb-10 text-white text-center font-bold text-2xl z-10">
            welcome to <span className="font-extrabold tracking-wide">chatly</span>
          </div>
        </div>

        {/* Form Inputs */}
     
        <div className="p-6 pt-0 space-y-4">
          
          {/* Username Input */}
          <input
            type="text"
            placeholder="username"
            aria-label="Username"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-150"
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="email"
            aria-label="Email"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-150"
          />

          {/* Password Input with Show/Hide Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              aria-label="Password"
              className="w-full border border-gray-300 rounded-lg p-3 pr-20 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-150"
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-full px-4 text-sm font-medium text-sky-500 hover:text-sky-700 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "hide" : "show"}
            </button>
          </div>

          {/* Sign Up Button */}
          <button 
            className="w-full bg-sky-500 text-white font-semibold rounded-lg py-3 mt-4 shadow-md hover:bg-sky-600 transition duration-200 transform hover:scale-[1.01]"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p className="text-center text-sm pt-4 text-gray-600">
            Already Have An Account ?{" "}
            <Link to="/login" className="text-sky-500 font-medium hover:underline hover:text-sky-700 transition">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

