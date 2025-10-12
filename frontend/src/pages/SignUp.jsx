import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../main';
import {useDispatch, useSelector} from 'react-redux'
import { setUserData } from '../redux/userSlice';
function SignUp() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const dispatch = useDispatch()
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`, {
        userName,
        email,
        password,
      }, {
        withCredentials: true,
      });
      dispatch(setUserData(result.data))
      console.log("Signup success:", result.data); //remove
      navigate("/profile");
      setEmail("")
      setPassword("")
      setLoading(false)
      setErr("")
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setLoading(false)
      setErr(error?.response?.data?.message)
    }
  };

  return (
    <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
      <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
        <div className='w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center'>
          <h1 className='text-gray-600 font-bold text-[30px]'>
            Welcome to <span className='text-white'>chatly</span>
          </h1>
        </div>

        <form className="w-full flex flex-col gap-[20px] items-center" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="username"
            className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-lg text-gray-700 text-[19px]"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            type="email"
            placeholder="email"
            className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-lg text-gray-700 text-[19px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="w-[90%] h-[50px] border-2 border-[#20c7ff] overflow-hidden rounded-lg shadow-lg relative">
            <input
              type={show ? "text" : "password"}
              placeholder="password"
              className="w-full h-full outline-none px-[20px] py-[10px] bg-white text-gray-700 text-[19px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute top-[12px] right-[20px] text-[20px] text-[#20c7ff] font-semibold cursor-pointer"
              onClick={() => setShow(prev => !prev)}
            >
              {show ? "hide" : "show"}
            </span>
          </div>
          {err && <p className='text-red-500'>{"*"+err}</p>}
          <button
            className="px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner"
            disabled={loading}
          >
            {loading?"Loading...":"Sign Up"}
          </button>

          <p className="cursor-pointer" onClick={() => navigate("/login")}>
            Already Have An Account?{' '}
            <span className="text-[#20c7ff] font-bold">Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;