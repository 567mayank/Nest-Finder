import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios"
import { Context } from '../Context/Context';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message,setMessage] = useState("")
  const location = useLocation();
  const {checkUser,isLoggedin} = useContext(Context)
  const navigate = useNavigate()

  // Correct the handleSubmit to handle the form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!userName.trim() || !password.trim()) {
      setMessage("All Fields Required")
      return
    }
    try {
      const response = await axios.post(
        `http://localhost:8000/user/login`,
        {
          userName,
          password
        },
        {
          withCredentials : true
        }
      )
      setMessage(response.data.message)
      checkUser()
      navigate("/profile")
    } catch (error) {
      console.log(error.response.data)
      setMessage(error.response.data.message)
    }
  };

  useEffect(()=>{
    setMessage("")
  },[userName,password])

  // for redirecting back to previous page
  useEffect(()=>{
    if(isLoggedin) {
      if (location.state?.from === "/login") {
        navigate("/profile");
      }
      else if(location.state?.from) {
        navigate(location.state.from)
      } else {
        navigate(-1); 
      }
    }
  },[isLoggedin,checkUser])

  return (
    <section className="bg-gray-50 dark:bg-gray-900 md:ml-64">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Left Section */}
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Welcome to NestFinder
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            At NestFinder, we believe in connecting people to their ideal homes. Whether you're buying, selling, or renting, we offer a seamless experience powered by technology, innovation, and a commitment to making real estate simple and accessible for everyone.
          </p>
          <Link
            to="#"
            className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"
          >
            Read more about our app
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>

        {/* Right Section (Sign In Form) */}
        <div>
          <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sign in to NestFinder
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your Username
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="johnDoe"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-end">
                <Link to="#" className="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Lost Password?
                </Link>
              </div>
              <button
                type="submit" 
                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login to your account
              </button>

              {
                message && <div className='text-blue-700 font-normal text-center'>{message}</div>
              }

              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Not registered yet?{' '}
                <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-500">
                  Create account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
