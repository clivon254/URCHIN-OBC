
import React from 'react'
import { BrowserRouter, Navigate, Outlet, Route ,Routes } from "react-router-dom"
import {Toaster} from "sonner"
import { useSelector } from "react-redux"
import SignIn from './pages/SignIn'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import DashSidebar from './components/DashSidebar'
import Header from './components/Header'
import Profile from './pages/Profile'


const LayOut = () => {


  const {currentUser} = useSelector(state => state.user)


  return (

    currentUser ? 

    <div className="w-full h-screen flex flex-col"> 

        <Header/>

        <div className="w-full flex ">

          {/* sidebar */}
          <div className="hidden lg:flex lg:w-[20%] overscroll-y-auto border-r border-textPrimary">

            <DashSidebar/>

          </div>

          {/* main side */}
          <div className="w-full lg:w-[80%] overflow-y-scroll overflow-hidden">

            <Outlet />

          </div>

        </div>

    </div>

    :

    <Navigate to="/sign-in"/>

  )

}



export default function App() {

  return (

    <BrowserRouter>

        <main className="w-full min-h-screen">

          <Toaster richColors/>

          <Routes>

            <Route element={<LayOut/>}>

              <Route path="/" element={<Dashboard/>}/>

              <Route path="/profile" element={<Profile/>}/>
              
            </Route>

            <Route path="/sign-in" element={<SignIn/>}/>

            <Route path="/forgot-password" element={<ForgotPassword/>}/>

            <Route path="/reset-password/:token" element={<ResetPassword/>}/>

          </Routes>

        </main>
    
    </BrowserRouter>

  )

}
