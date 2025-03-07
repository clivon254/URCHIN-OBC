

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
import _ from "lodash"




export default function Users() {

    const {url,users,setUsers,usersLoading,usersError,fetchUsers,openDelete,setOpenDelete} = useContext(StoreContext)

    const [loader, setLoader] = useState([{},{},{},{},{}])

    const [user ,setUser] = useState({})

    const [fetchingUserLoading ,setfetchingUserLoading] = useState(false)

    const [fetchingUserError ,setfetchingUserError] = useState(false)

    const [userToDelete , setUserToDelete] = useState("")

    const [filteredUsers , setFilteredUsers] = useState(users)

   

    // handleSearch
    const handleSearch = (e) => {

        const searchUser = e.target.value 

        const filtered = users?.filter((product) => product.email.toLowerCase().includes(searchUser.toLowerCase()))

        setFilteredUsers(filtered)

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


    useEffect(() => {

        setFilteredUsers(users)

    },[])

    // ***  PAGINATION  START***//
  
    const [page ,setPage] = useState(1)
  
    const [limit ,setLimit] = useState(5)

    const [siblings ,setSiblings] = useState(1)


    // getproducts
    const getProducts = (page,limit) => {

        let array = []

        for(let i = (page -1) * limit ; i < (page * limit) && filteredUsers[i] ; i++)
        {
            array.push(filteredUsers[i])
        }

        return array;

    }

    const finalUsers = getProducts(page,limit)

    const finalLength = filteredUsers?.length

    const totalPage = Math.ceil(finalLength / limit)


    // returnPaginationPage
    const returnPaginationPage = (totalPage ,page ,limit,siblings) => {

        let totalPageNoInArrray = 7 + siblings

        if(totalPageNoInArrray >= totalPage)
        {
            return _.range(1 ,totalPage + 1)
        }

        let leftSiblingsIndex = Math.max(page - siblings , 1)

        let rightSiblingsIndex = Math.min(page + siblings, totalPage)


        let showLeftDots = leftSiblingsIndex > 2 ;

        let showRightDots = rightSiblingsIndex < totalPage - 2

        if(!showLeftDots && showRightDots)
        {
            let leftItemsCount = 3 + 2 * siblings ;

            let leftRange = _.range(1 ,leftItemsCount + 1)

            return [...leftRange ,"...", totalPage]
        }
        else if(showLeftDots && !showRightDots)
        {
            let rightItemsCount = 3 + 2 * siblings

            let rightRange = _.range(totalPage - rightItemsCount + 1,totalPage +1)

            return [1, "...", ...rightRange]
        }
        else
        {
            let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1)

            return[1,"...",...middleRange,"...",totalPage]
        }

    }

    const array = returnPaginationPage(totalPage,page,limit,siblings)

    // handlePageChange
    const handlePageChange = (value) => {

        if(value === "&laquo;")
        {
            setPage(1)
        }
        else if(value === "&lsquo;")
        {
            if(page !== 1)
            {
                setPage(page -1)
            }
        }
        else if(value === "&raquo;" )
        {
            if(page !== totalPage)
            {
                setPage(page+1)
            }
        }
        else if(value === "&rsquo;")
        {
            setPage(totalPage)
        }
        else
        {
            setPage(value)
        }

    }


  // ***  PAGINATION  END ***//

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
                            {finalUsers.length > 0 ? (

                                <>

                                    {finalUsers.map((user,index) => (

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

                                            <Table.Cell className={` text-nowrap ${user.isAdmin ? "text-red-500 font-semibold uppercase " :""} `}>
                                                {user?.username}
                                            </Table.Cell>

                                            <Table.Cell className="text-primaryBackground">
                                                {user?.email}
                                            </Table.Cell>

                                            <Table.Cell>
                                                <div className="text-nowrap text-textSecondary font-semibold">{user?.role}</div>
                                                
                                            </Table.Cell>

                                            <Table.Cell>

                                                <div className="flex items-center gap-x-2">

                                                    <span className="text-blue-500 cursor-pointer">

                                                        <Link to={`/update-user/${user?._id}`}>

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

            {/* pagination */}
            {finalUsers.length > 0 && (

                <div className="w-full flex justify-center items-center">

                    <ul className="flex py-4 ">

                        <li className="paginate-left">
                            <span onClick={() => handlePageChange("&laquo;")} className="">&laquo;</span>
                        </li>

                        <li className="paginate">
                            <span onClick={() => handlePageChange("&lsquo;")} className="">&lsaquo;</span>
                        </li>

                        {array.map(value => {

                            if(value === page)
                            {
                                return (
                                    <li className="paginate-active">
                                        <span onClick={() => handlePageChange(value)} className="">{value}</span>
                                    </li>
                                )
                            }
                            else
                            {
                                return (
                                    <li className="font-bold paginate">
                                        <span onClick={() => handlePageChange(value)} className="">{value}</span>
                                    </li>
                                )
                            }

                        })}
                        
                        <li className="paginate">
                            <span onClick={() => handlePageChange("&raquo;")} className="">&rsaquo;</span>
                        </li>

                        <li className="paginate-right">
                            <span onClick={() => handlePageChange("&rsquo;")} className="">&raquo;</span>
                        </li>

                    </ul>

                </div>

            )}

        </section>

        {openDelete && (

            <Delete product={"user"} item={user?.email} handleDelete={handleDelete}/>

        )}

    </>

  )

}
