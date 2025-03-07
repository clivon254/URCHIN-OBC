
import { createContext, useEffect, useState } from "react";
import { MdHome } from "react-icons/md";
import { FaUsers } from "react-icons/fa"
import axios from "axios"


                                                                               

export const StoreContext = createContext(null)


export default function StoreContextProvider (props){

    const url = `http://localhost:3000`

    // const url ="https://urchin-obc-server.onrender.com"

    const [token , setToken] = useState()

    const [open ,setOpen ] = useState(false)

    const [openDelete ,setOpenDelete] = useState(false)

    const [Navlinks ,setNavlinks] = useState([
        {
            title:"Dashboard",
            link:"/",
            icon:<MdHome />
        },
        {
            title:"Users",
            link:"/users",
            icon:<FaUsers />
        },
        {
            title:"Dashboard",
            link:"/",
            icon:<MdHome />
        },
        {
            title:"Dashboard",
            link:"/",
            icon:<MdHome />
        },
        {
            title:"Dashboard",
            link:"/",
            icon:<MdHome />
        },
        {
            title:"Dashboard",
            link:"/",
            icon:<MdHome />
        },
        {
            title:"Dashboard",
            link:"/",
            icon:<MdHome />
        }
    ])

    const [users , setUsers] = useState([])

    const [usersLoading , setUsersLoading] = useState(false)

    const [usersError , setUsersError] = useState(false)


    // fetchUsers
    const fetchUsers = async () => {

        try
        {
            setUsersLoading(true)

            setUsersError(false)

            const res = await axios.get(url + "/api/user/get-users")

            if(res.data.success)
            {
                setUsersLoading(false)

                setUsers(res.data.usersWithoutPassword)
            }

        }
        catch(error)
        {
            console.log(error.message)

            setUsersError(true)

            setUsersLoading(false)

        }

    }


    useEffect(() => {

        fetchUsers()

    },[])



    const contextValue = {
        url,
        token, setToken,
        open , setOpen ,
        Navlinks , setNavlinks,
        openDelete , setOpenDelete,
        users , setUsers ,
        usersLoading , setUsersLoading ,
        usersError , setUsersError ,
        fetchUsers 

    }

    return(

        <StoreContext.Provider value={contextValue}>

            {props.children}
            
        </StoreContext.Provider>

    )

}