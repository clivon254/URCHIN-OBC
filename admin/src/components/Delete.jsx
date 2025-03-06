

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import { HiExclamation, HiExclamationCircle } from "react-icons/hi"



export default function Delete({product,item,handleDelete}) {

    const {setOpenDelete} = useContext(StoreContext)

  return (

    <div className="w-full h-full flex items-center justify-center fixed top-0 left-0 bg-black/50 backdrop-blur-sm">

        <div className="space-y-5 p-4 w-[80%] lg:w-[40%] 2xl:w-[30%] mx-auto shadow-md bg-white transition-all duration-500 ease-in rounded-md">

            <HiExclamationCircle size={50} className="mx-auto"/>

            <h2 className="text-center text"></h2>

        </div>

    </div>
    
  )

}
