
import React from 'react'
import { BrowserRouter, Navigate, Route ,Routes } from "react-router-dom"
import {Toaster} from "sonner"
import { useSelector } from "react-redux"
import SignIn from './pages/SignIn'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'


const LayOut = () => {


  const {currentUser} = useSelector(state => state.user)


  return (

    currentUser?.isAdmin ? 

    <div className=""></div>

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
              
            </Route>

            <Route path="/sign-in" element={<SignIn/>}/>

            <Route path="/forgot-password" element={<ForgotPassword/>}/>

            <Route path="/reset-password/:token" element={<ResetPassword/>}/>

          </Routes>

        </main>
    
    </BrowserRouter>

  )

}
