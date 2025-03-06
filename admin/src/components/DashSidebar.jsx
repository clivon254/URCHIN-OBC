

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import { NavLink } from 'react-router-dom'

export default function DashSidebar() {

  const {open,setOpen,Navlinks} = useContext(StoreContext)

  return (
    
    <aside className="w-full ">

      <div className="flex flex-col gap-y-4">

        {Navlinks.map((nav,index) => (

          <NavLink
            key={index}
            to={nav.link}
            onClick={() => setOpen(false) }
          >

            <span className="flex items-center gap-x-5">

              {nav?.icon} {nav?.title}

            </span>

          </NavLink>

        ))}

      </div>

    </aside>
  )

}
