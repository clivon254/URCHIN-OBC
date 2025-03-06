

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signOutSuccess } from '../redux/user/userSlice'
import { toast } from 'sonner'
import { MdClose, MdMenu } from "react-icons/md"
import LOGOO from "../assets/LOGOO.png"
import { Avatar, Dropdown } from 'flowbite-react'
import DashSidebar from './DashSidebar'


export default function Header() {

    const {open ,setOpen } = useContext(StoreContext)

    const {currentUser} = useSelector(state => state.user )

    const dispatch = useDispatch()

    const navigate = useNavigate()

    // handleSignOut
    const handleSignOut = () => {

        try
        {
            dispatch(signOutSuccess())

            toast.success("you have sign out successfully")

            navigate("/sign-in")

        }
        catch(error)
        {
            console.log(error.message)
        }

    }

  return (

    <>

        <header className="p-3">

            <div className="flex items-center justify-between">

                {/* toggle */}
                <div className="lg:hidden cursor-pointer">

                    <button className="">
                        {open ? 
                            (
                                <MdClose 
                                    size={30}
                                    onClick={() => setOpen(false)}
                                    className="cursor-pointer"
                                />
                            ) 
                            : 
                            (
                                <MdMenu
                                    size={30}
                                    onClick={() => setOpen(true)}
                                    className="cursor-pointer"
                                />
                            )
                        }
                    </button>

                </div>

                {/* logo */}
                <div className="h-12 w-14">

                    <img 
                        src={LOGOO}
                        alt="" 
                        className="w-full h-full" 
                    />

                </div>

                {/* actions */}
                <div className="">

                    <Dropdown
                        inline
                        arrowIcon={false}
                        label={
                            <Avatar
                                alt="user"
                                img={currentUser?.profilePicture}
                                rounded
                            />
                        }
                    >

                        <Dropdown.Header>

                            <span className="block">{currentUser?.username}</span>

                            <span className="block">{currentUser?.email}</span>

                            <span className="block">{currentUser?.role}</span>

                        </Dropdown.Header>

                        <Link to="/profile">

                            <Dropdown.Item>profile</Dropdown.Item>

                        </Link>

                        <Dropdown.Item 
                            onClick={() => handleSignOut()}
                        >
                            Sign out
                        </Dropdown.Item>

                    </Dropdown>

                </div>

            </div>

        </header>

        {/* drawer */}
        <div className={`w-full h-full fixed top-0 bg-black/50 backdrop-blur-sm origin-top transition-all duration-200 ease-in lg:hidden overflow-y-hidden z-50 ${open ? "left-0" : "left-[-100%]"}`}>
                
            <div className="absolute left-0 w-[70%] h-full bg-white space-y-6 overflow-y-scroll px-3">
                
                {/* toggle button */}
                <div className="flex justify-end p-2">

                    <span className="" onClick={() => setOpen(false)}>

                        <MdClose size={30}/>

                    </span>

                </div>

                <img 
                    src={LOGOO} 
                    alt="" 
                    className="h-12 w-16"
                />

                <DashSidebar />

            </div>

        </div>

    </>

  )

}
