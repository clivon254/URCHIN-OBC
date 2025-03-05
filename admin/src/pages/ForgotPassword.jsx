
import React, { useContext, useState } from 'react'
import LOGOO from "../assets/LOGOO.png"
import { StoreContext } from '../context/store'
import axios from "axios"
import { toast } from 'sonner'
import { Alert } from 'flowbite-react'
import Loading from '../components/Loading'



export default function ForgotPassword() {

  const {url} = useContext(StoreContext)

  const [formData ,setFormData] = useState({})

  const [loading , setLoading] = useState(false)

  const [error , setError] = useState(false)



  // handleChange
  const handleChange = (e) => {

    setFormData({...formData,[e.target.name]:e.target.value})

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {
      setLoading(true)

      setError(null)

      const res = await axios.post(url + "/api/auth/forgot-password",formData)

      if(res.data.success)
      {

        setLoading(false)

        toast.success("Link sent to your email")

        setFormData({})

      }

    }
    catch(error)
    {

      setLoading(false)

      if(error.response)
      {

        const errorMessage = error.response.data.message

        setError(errorMessage)

      }
      else
      {

        setError(error.message)

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
          <div className="space-y-5">

            <h2 className="text-center text-2xl/9 font-bold tracking-tighter text-textSecondary">
             Forgot Password
            </h2>

            <h3 className="text-center text-base tracking-tight text-textPrimary">
             Enter your email a link will be sent to your email account to  reset the password
            </h3>

          </div>

        </header>

        {/* form */}
        <div className="w-full max-w-md mx-auto">

          <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">

              {/* email */}
              <div className="flex flex-col gap-y-1">

                <label  className="block text-sm/6 font-medium text-gray-900">email</label>

                <input 
                  type="email" 
                  placeholder="name@example" 
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-textSecondary sm:text-sm/6'
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />

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
                  ("submit")}
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
