

import React, { useContext ,useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io"
import { StoreContext } from '../context/store'
import { Table } from 'flowbite-react'
import Error from '../components/Error'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import axios from "axios"
import {toast} from 'sonner'
import Delete from '../components/Delete'


export default function Users() {

    const {url,users,setUsers,usersLoading,usersError,fetchUsers,openDelete,setOpenDelete} = useContext(StoreContext)

    const [loader, setLoader] = useState([{},{},{},{},{}])

    const [user ,setUser] = useState({})

    const [fetchingUserLoading ,setfetchingUserLoading] = useState(false)

    const [fetchingUserError ,setfetchingUserError] = useState(false)

    const [userToDelete , setUserToDelete] = useState("")

    const [filteredUser , setFilteredUser] = useState(users)

   

    // handleSearch
    const handleSearch = (e) => {

        const searchUser = e.target.value 

        const filtered = users.map((product) => product.email.toLowerCase().includes(searchUser.toLowerCase()))

        setFilteredUser(filtered)

    } 

    // fetchUser
    const fetchUser = async () => {

        try
        {
            setfetchingUserLoading(true)

            setfetchingUserError(false)

            const res = await axios.get(url + `/api/user/get-user/${userToDelete}`)

            if(res.data.success)
            {
                setfetchingUserLoading(false)

                setUser(res.data.rest)
            }

        }
        catch(error)
        {
            setfetchingUserError(true)

            console.log(error.message)
        }

    }

    // handleDelete
    const handleDelete = async () => {

        try
        {
            const res = await axios.delete(url + `/api/user/delete-user/${userToDelete}`)

            if(res.data.success)
            {
                setOpenDelete(false)

                setUsers((prev) => 
                 prev.filter(user => user._id ==!userToDelete))

                toast.success(`${user.name} deleted successfully`)
            }

        }
        catch(error)
        {
            console.log(error.message)
        }

    }

    useEffect(() => {

        fetchUser()

    },[userToDelete])

  return (

    <>

        <section className="w-full p-5 space-y-10">

            {/* header */}
            <header className="flex flex-col gap-y-3 sm:flex-row sm:justify-between sm:items-center">

                {/* title */}
                <div className="space-y-2">

                    <h2 className="title3">Users</h2>

                    <h4 className="text-sm 2xl:text-xl text-slate-600">
                        Detailed information about the users
                    </h4>

                </div>

                {/* button */}
                <button className="button sm:max-w-sm">

                    <Link to="/sign-up" className="flex items-center gap-x-3">

                        <IoMdAdd/> Add User

                    </Link>

                </button>

            </header>

            {/* search */}
            <div className="flex justify-between items-center gap-x-5">

                <input 
                    type="text" 
                    className="input " 
                    placeholder="enter user email . . ."
                    onChange={handleSearch}
                />

                <button 
                    className="button"
                >
                    search
                </button>

            </div>

            {/* users */}
            <div className="tabler">

                <Table>

                    <Table.Head>

                        <Table.HeadCell></Table.HeadCell>

                        <Table.HeadCell>image</Table.HeadCell>

                        <Table.HeadCell>username</Table.HeadCell>

                        <Table.HeadCell>email</Table.HeadCell>

                        <Table.HeadCell>role</Table.HeadCell>

                        <Table.HeadCell>actions</Table.HeadCell>

                    </Table.Head>

                    {!usersLoading && !usersError &&  (

                        <>
                            {users.length > 0 ? (

                                <>

                                    {users.map((user,index) => (

                                        <Table.Body key="index">

                                            <Table.Cell>{index + 1}.</Table.Cell>

                                            <Table.Cell>

                                                <div className="h-12 w-16 min-h-16 min-w-12">

                                                    <img 
                                                        src={user?.profilePicture}
                                                        alt=""
                                                        className="h-full w-full rounded-md shadow-sm" 
                                                    />

                                                </div>

                                            </Table.Cell>

                                            <Table.Cell className={`${user.isAdmin ? "text-red-500 font-semibold uppercase " :""} `}>
                                                {user?.username}
                                            </Table.Cell>

                                            <Table.Cell className="text-primaryBackground">
                                                {user?.email}
                                            </Table.Cell>

                                            <Table.Cell>
                                                {user?.role}
                                            </Table.Cell>

                                            <Table.Cell>

                                                <div className="flex items-center gap-x-2">

                                                    <span className="text-blue-500 cursor-pointer">

                                                        <Link to="/update-user">

                                                            <FaEdit size={20}/>

                                                        </Link>

                                                    </span>

                                                    <span className="text-red-500 cursor-pointer">

                                                        <FaTrashAlt 
                                                            size={20}
                                                            onClick={() => {

                                                                handleDelete()

                                                                setOpenDelete(true)

                                                                setUserToDelete(user._id)
                                                                
                                                            }}
                                                        />

                                                    </span>

                                                </div>

                                            </Table.Cell>

                                        </Table.Body>

                                    ))}

                                </>
                            ) 
                            : 
                            (
                                <Table.Body>

                                    <Table.Cell colSpan={6} className="text-xl textcenter text-slate-600 font-semibold">
                                        You have no users yet
                                    </Table.Cell>

                                </Table.Body>
                            )
                            }
                        </>

                    )}

                    {usersLoading && !usersError &&  (

                        <>
                            {loader.map((loader,index) => (

                                <Table.Body key={index}>

                                    <Table.Cell>

                                        <span className="loader h-5 w-5 rounded-md"/>

                                    </Table.Cell>

                                    <Table.Cell>

                                        <span className="loader h-12 w-12 rounded-full"/>

                                    </Table.Cell>

                                    <Table.Cell>

                                        <span className="loader h-5 w-20 rounded-md"/>

                                    </Table.Cell>

                                    <Table.Cell>

                                        <span className="loader h-5 w-12 rounded-md"/>

                                    </Table.Cell>

                                    <Table.Cell>

                                        <span className="loader h-5 w-8 rounded-md"/>

                                    </Table.Cell>

                                    <Table.Cell>

                                        <div className="flex items-center gap-x-1">

                                            <span className="loader h-6 w-6 rounded-full"/>

                                            <span className="loader h-6 w-6 rounded-full"/>

                                            <span className="loader h-6 w-6 rounded-full"/>

                                        </div>

                                    </Table.Cell>

                                </Table.Body>

                            ))}
                        </>

                    )}

                    {usersError &&  (

                        <Table.Body>

                            <Table.Cell colSpan={6}>

                                <Error retry={fetchUsers}/>

                            </Table.Cell>

                        </Table.Body>

                    )}

                </Table>

            </div>

        </section>

        {openDelete && (

            <Delete product={"user"} item={user?.email} handleDelete={handleDelete}/>

        )}

    </>

  )

}
