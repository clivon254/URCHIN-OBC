
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
import Users from './pages/Users'
import SignUp from './pages/SignUp'
import UpdateUser from './pages/UpdateUser'
import Partner from './pages/Partner'
import AddPartner from './pages/AddPartner'
import UpdatePartner from './pages/UpdatePartner'
import Services from './pages/Services'
import AddService from './pages/AddService'
import UpdateService from './pages/UpdateService'
import Roles from './pages/Roles'
import AddRole from './pages/AddRole'
import UpdateRole from './pages/UpdateRole'
import UpdateProgram from './pages/UpdateProgram'
import Program from './pages/Program'
import AddProgram from './pages/AddProgram'
import Career from './pages/Career'
import AddCareer from './pages/AddCareer'
import UpdateCareer from './pages/UpdateCareer'


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

              <Route path="/users" element={<Users/>}/>

              <Route path="/update-user/:userId" element={<UpdateUser/>}/>

              <Route path="/partners" element={<Partner/>}/>

              <Route path="/add-partner" element={<AddPartner/>}/>

              <Route path="/update-partner/:patnerId" element={<UpdatePartner/>}/>

              <Route path="/services" element={<Services/>}/>

              <Route path="/add-service" element={<AddService/>}/>

              <Route path="/update-service/:patnerId" element={<UpdateService/>}/>

              <Route path="/roles" element={<Roles/>}/>

              <Route path="/add-role" element={<AddRole/>}/>

              <Route path="/update-role/:roleId" element={<UpdateRole/>}/>

              <Route path="/programs" element={<Program/>}/>

              <Route path="/add-program" element={<AddProgram/>}/>

              <Route path="/update-program/:programId" element={<UpdateProgram/>}/>

              <Route path="/careers" element={<Career/>}/>

              <Route path="/add-career" element={<AddCareer/>}/>

              <Route path="/update-career/:careerId" element={<UpdateCareer/>}/>
              
            </Route>

            <Route path="/sign-in" element={<SignIn/>}/>

            <Route path="/sign-up" element={<SignUp/>}/>

            <Route path="/forgot-password" element={<ForgotPassword/>}/>

            <Route path="/reset-password/:token" element={<ResetPassword/>}/>

          </Routes>

        </main>
    
    </BrowserRouter>

  )

}
