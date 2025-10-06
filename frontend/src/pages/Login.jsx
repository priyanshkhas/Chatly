import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [show, setShow] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-96">
        {/* Header */}
        <div className="bg-sky-400 text-white rounded-t-lg p-6 text-center font-bold text-lg rounded-b-[50%]">
          Login to chatly
        </div>

        {/* Form */}
        <div className="p-6">
          <input
            type="email"
            placeholder="email"
            className="w-full border border-sky-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <div className="relative mb-4">
            <input
              type={show ? "text" : "password"}
              placeholder="password"
              className="w-full border border-sky-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <span
              className="absolute right-3 top-2 text-sky-500 cursor-pointer select-none"
              onClick={() => setShow(!show)}
            >
              {show ? "hide" : "show"}
            </span>
          </div>

          <button className="w-full bg-sky-400 text-white font-medium rounded-md py-2 hover:bg-sky-500 transition">
            Login
          </button>

          <p className="text-center text-sm mt-4">
            Want to create a new account?{" "}
            <Link to="/signup" className="text-sky-500 hover:underline">
              sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
