

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import { HiExclamationCircle } from "react-icons/hi"



export default function Delete({product,item,handleDelete}) {

    const {setOpenDelete} = useContext(StoreContext)

  return ( 

    <div className="w-full h-full flex items-center justify-center fixed top-0 left-0 bg-black/50 backdrop-blur-sm">

        <div className="space-y-5 p-4 w-[80%] lg:w-[40%] 2xl:w-[30%] mx-auto shadow-md bg-white transition-all duration-500 ease-in rounded-md">

            <HiExclamationCircle size={50} className="mx-auto"/>

            <h2 className="text-center text-xl font-semibold text-slate-700">
                Are sure you want to delete {product} , {item} ?
            </h2>
            
            <div className="flex justify-around items-center gap-x-4">

                <button 
                    className="buttonDelete"
                    onClick={() => handleDelete()}
                >
                    Yes, Im sure
                </button>

                <button 
                    className="buttonCancel"
                    onClick={() => setOpenDelete(false)}
                >
                    No , Cancel 
                </button>

            </div>

        </div>

    </div>
    
  )

}
