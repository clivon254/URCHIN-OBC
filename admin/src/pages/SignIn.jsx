

import React, { useContext, useState } from 'react'
import LOGOO from "../assets/LOGOO.png"
import { StoreContext } from '../context/store'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import axios from "axios"
import { toast } from 'sonner'
import { IoMdEyeOff } from 'react-icons/io'
import { IoEye } from 'react-icons/io5'
import { Alert } from 'flowbite-react'
import Loading from '../components/Loading'



export default function SignIn() {

  const {url,setToken} = useContext(StoreContext)

  const [formData ,setFormData] = useState({})

  const {loading , error } = useSelector(state => state.user)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [showPassword , setShowPassword] = useState(false)



  // handleChange
  const handleChange = (e) => {

    setFormData({...formData,[e.target.name]:e.target.value})

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {
      dispatch(signInStart())

      const res = await axios.post(url + "/api/auth/sign-in",formData)

      if(res.data.success)
      {

        dispatch(signInSuccess(res.data.rest))

        toast.success("signed in successfully")

        navigate("/")

      }

    }
    catch(error)
    {

      if(error.response)
      {

        const errorMessage = error.response.data.message

        dispatch(signInFailure(errorMessage))

        console.log(errorMessage)

      }
      else
      {

        dispatch(signInFailure(error.message))

        console.log(error.message)

      }

    }

  }

  console.log(formData)

  return (

    <main className="min-h-screen w-full flex items-center justify-center px-8">

      <div className="w-full flex flex-col gap-y-5">

        {/* header */}
        <header className="w-full  flex flex-col items-center justify-center gap-y-5">

          {/* logo */}
          <div className="h-20 w-20">

            <img 
              src={LOGOO}
              alt="" 
              className="h-full w-full" 
            />

          </div>

          {/* title */}
          <div className="">

            <h2 className="text-center text-2xl/9 font-bold tracking-tighter text-textSecondary">
              Sign in to your account
            </h2>

          </div>

        </header>

        {/* form */}
        <div className="w-full max-w-md mx-auto">

          <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">

              {/* email */}
              <div className="flex flex-col gap-y-1">

                <label  className="block text-sm/6 font-medium text-gray-900">email</label>

                <input 
                  type="text" 
                  placeholder="" 
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-textSecondary sm:text-sm/6'
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />

              </div>

              {/* password */}
              <div className="flex flex-col gap-y-1">

                <label  className="block text-sm/6 font-medium text-gray-900">Password</label>

                <div className="w-full relative">

                  <input 
                    type={showPassword ? "text" :"password"}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-textSecondary sm:text-sm/6" 
                    placeholder='*******'
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                  />

                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? 
                      (<IoMdEyeOff size={20} className=""/>)
                      :
                      (<IoEye size={20} className=""/>)
                    }
                  </button>

                </div>

              </div>
              
              {/* rem && forgot */}
              <div className="flex items-center justify-between">
                
                {/* rem */}
                <div className="flex items-center gap-x-3">

                  <input 
                    type="checkbox" 
                    className="rounded-md" 
                  />

                  <label className="block text-sm/6 font-medium text-primaryBackground">remember me</label>

                </div>
                
                {/* forgit */}
                <span className="block text-sm/6 font-medium text-primaryBackground">

                  <Link to="/forgot-password">Forgot password ?</Link>

                </span>

              </div>
              
              {/* button */}
              <button 
                type="submit"
                className="flex w-full justify-center rounded-md bg-secondaryBackground px-3 py-3 text-sm/6 font-semibold text-white shadow-xs hover:bg-secondaryBackground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondaryBackground disabled:cursor-not-allowed cursor-pointer disabled:bg-secondaryBackground/90 "
                disabled={loading}
              >
                {loading ? 
                  (
                    <Loading />
                  ) 
                  : 
                  ("sign in")}
              </button>

              {error && (

                <Alert color="failure">{error}</Alert>

              )}

          </form>

        </div>


      </div>

    </main>

  )
}
