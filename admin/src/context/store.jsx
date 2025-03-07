
import { createContext, useEffect, useState } from "react";
import { MdHome, MdPallet, MdPattern, MdRoomService } from "react-icons/md";
import { FaCashRegister, FaProjectDiagram, FaRegFolder, FaServicestack, FaUsers } from "react-icons/fa"
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
            title:"Partners",
            link:"/partners",
            icon:<MdPattern/>
        },
        {
            title:"Services",
            link:"/services",
            icon:<FaServicestack/>
        },
        {
            title:"Roles",
            link:"/roles",
            icon:<FaRegFolder/>
        },
        {
            title:"Program",
            link:"/programs",
            icon:<FaProjectDiagram />
        },
        {
            title:"Career",
            link:"/careers",
            icon:<FaCashRegister />
        }
    ])

    const [users , setUsers] = useState([])

    const [usersLoading , setUsersLoading] = useState(false)

    const [usersError , setUsersError] = useState(false)

    const [roles , setRoles] = useState([])

    const [rolesLoading , setRolesLoading] = useState(false)

    const [rolesError , setRolesError] = useState(false)


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

    // fetchUsers
    const fetchRoles = async () => {

        try
        {
            setRolesLoading(true)

            setRolesError(false)

            const res = await axios.get(url + "/api/role/get-roles")

            if(res.data.success)
            {
                setRolesLoading(false)

                setRoles(res.data.roles)
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

        fetchRoles()

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
        fetchUsers ,
        roles , setRoles ,
        rolesLoading , setRolesLoading ,
        rolesError , setRolesError ,
        fetchRoles ,
    }

    return(

        <StoreContext.Provider value={contextValue}>

            {props.children}
            
        </StoreContext.Provider>

    )

}