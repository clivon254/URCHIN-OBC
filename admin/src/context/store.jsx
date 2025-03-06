
import { createContext, useState } from "react";
import { MdHome } from "react-icons/md";



export const StoreContext = createContext(null)


export default function StoreContextProvider (props){

    const url = `http://localhost:3000`

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
            title:"roles",
            link:"/roles",
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
        },
        {
            title:"Dashboard",
            link:"/",
            icon:<MdHome />
        }
    ])


    const contextValue = {
        url,
        token, setToken,
        open , setOpen ,
        Navlinks , setNavlinks,
        openDelete , setOpenDelete
    }

    return(

        <StoreContext.Provider value={contextValue}>

            {props.children}
            
        </StoreContext.Provider>

    )

}