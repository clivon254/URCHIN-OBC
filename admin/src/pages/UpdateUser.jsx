

import React, { useContext, useEffect, useRef, useState } from 'react'
import { StoreContext } from '../context/store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import { app } from '../firebase'
import { signOutSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice'
import axios from "axios"
import { toast } from 'sonner'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Alert } from 'flowbite-react'
import Loading from '../components/Loading'
import Error from '../components/Error'




export default function UpdateUser() {

    const {url,token,roles,fetchUsers} = useContext(StoreContext)

    const [formData , setFormData] = useState({})

    const [loading , setLoading] = useState(false)

    const [error , setError] = useState(null)

    const [user , setUser] = useState({})

    const [imageFile , setImageFile] = useState(null)

    const [imageFileUrl , setImageFileUrl] = useState(null)

    const [imageFileUploading , setImageFileUploading] = useState(false)

    const [imageFileUploadingProgress , setImageFileUploadingProgress] = useState(null)

    const [imageFileUploadError , setImageFileUploadError] = useState(null)

    const filePickerRef = useRef()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const {userId} = useParams()

    const [showPassword , setShowPassword] = useState(false)

    const [fetchingUserLoading ,setfetchingUserLoading] = useState(false)
    
    const [fetchingUserError ,setfetchingUserError] = useState(false)


    // handleImageChange
    const handleImageChange = (e) => {

        const file = e.target.files[0]

        if(file)
        {
            setImageFile(file)

            setImageFileUrl(URL.createObjectURL(file))
        }

    }

    // uploadImage
    const uploadImage = () => {

        setImageFileUploadError(null)

        setImageFileUploading(true)

        const storage = getStorage(app)

        const fileName = new Date().getTime() + imageFile.name 

        const storageRef = ref(storage ,fileName)

        const uploadTask = uploadBytesResumable(storageRef, imageFile)

        uploadTask.on(
            'state_changed',
            (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

                setImageFileUploadingProgress(progress.toFixed(0))
            },
            (error) => {

                setImageFileUploadError("image could not upload image")

                setImageFileUploadingProgress(null)

                setImageFileUploading(false)

                setImageFile(null)

                setImageFileUrl(null)

                console.log(error)
            },
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                    setImageFileUrl(downloadURL)

                    setFormData({...formData , profilePicture : downloadURL})

                    setImageFileUploading(false)
                })
            }
        )
    }


    useEffect(() => {

        if(imageFile)
        {
            uploadImage()
        }

    },[imageFile])


    // handleChange
    const handleChange = (e) => {

        setFormData({...formData , [e.target.name]:e.target.value})

    }


    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        if(Object.keys(formData).length === 0)
        {
            dispatch(updateUserFailure("No changes made"))

            return
        }

        if(imageFileUploading)
        {
            dispatch(updateUserFailure("Please wait for the image to finish upload"))

            return
        }

        try
        {
            setLoading(true)

            setError(null)

            const res = await axios.put(url + `/api/user/update-user/${userId}`,formData)

            if(res.data.success)
            {
                setLoading(false)

                navigate('/users')

                toast.success("Profile updated successfully")

                fetchUsers()
            }

        }
        catch(error)
        {

            setLoading(false)

            if(error.response)
            {
                const errorMessage = error.response.data.Message 

                setError(errorMessage)

                console.log(error.message)
            }
            else
            {
                setError(error.message)
            }

        }

    }


     // fetchUser
     const fetchUser = async () => {

        try
        {
            setfetchingUserLoading(true)

            setfetchingUserError(false)

            const res = await axios.get(url + `/api/user/get-user/${userId}`)

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


    useEffect(() => {

        fetchUser()

    },[userId])

    console.log(formData)

  return (

    <>

        {!fetchingUserLoading && !fetchingUserError && (

            <>
            
                <section className="w-full p-5 space-y-10">

                    <h2 className="title text-center"> <span className="text-primaryBackground">{formData?.email} <br/></span>profile</h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 max-w-xl mx-auto">

                        <input 
                            type="file" 
                            onChange={handleImageChange}
                            accept='image/*'
                            ref={filePickerRef}
                            hidden
                        />

                        {/* image */}
                        <div 
                            className="relative h-32 w-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
                            onClick={() => filePickerRef.current.click()} 
                        >

                            {imageFileUploadingProgress && ( 

                                <CircularProgressbar 
                                    value={imageFileUploadingProgress || 0}
                                    text={`${imageFileUploadingProgress}%`}
                                    strokeWidth={5}
                                    styles={{
                                        root:{
                                            width:'100%',
                                            height:"100%",
                                            position:'absolute',
                                            top:0,
                                            left:0
                                        },
                                        path:{
                                            stroke:`rgba(62 ,152, 199 , ${imageFileUploadingProgress})`
                                        }
                                    }}
                                />

                            )}

                            <img 
                                src={imageFileUrl || user?.profilePicture}
                                alt="user" 
                                className={`rounded-full w-full h-full object-cover border-8
                                    ${imageFileUploadingProgress && imageFileUploadingProgress < 100 && `opacity-${imageFileUploadingProgress}`}`} 
                            />

                        </div>

                        {imageFileUploadError && (

                            <Alert color="failure"> {imageFileUploadError} </Alert>

                        )}
                        
                        {/* email */}
                        <div className="flex flex-col gap-y-2">

                            <label  className="label">email</label>

                            {/* email */}
                            <input 
                                type="email" 
                                className="input" 
                                placeholder="name@example.com"
                                name="email"
                                onChange={handleChange}
                                defaultValue={user?.email}
                            />

                        </div>

                        {/* username*/}
                        <div className="flex flex-col gap-y-2">

                            <label htmlFor="" className="label">username</label>

                            <input 
                                type="text" 
                                className="input" 
                                placeholder="name@example.com"
                                name="username"
                                onChange={handleChange}
                                defaultValue={user?.username}
                            />

                        </div>

                        {/* phone*/}
                        <div className="flex flex-col gap-y-2">

                            <label htmlFor="" className="label">phone</label>

                            <input 
                                type="text" 
                                className="input" 
                                placeholder="07XXXXXX"
                                name="phone"
                                onChange={handleChange}
                                defaultValue={user?.phone}
                            />

                        </div>

                        {/* Nationality */}
                        <div className="flex flex-col gap-y-2">

                            <label htmlFor="" className="label">Nationality</label>

                            <input 
                                type="text" 
                                className="input" 
                                placeholder="KENYA"
                                name="Nationality"
                                onChange={handleChange}
                                defaultValue={formData?.Nationality}
                            />

                        </div>

                        {/* role */}
                        <div className="flex flex-col gap-y-2">

                            <label className="label">role</label>

                            <select 
                                name="role"  
                                className="input"
                                onChange={handleChange}
                                defaultValue={user?.role}
                            >

                                <option value="none" >Select role</option>

                                {roles?.map((role,index) => (

                                    <option key={index} value={role?.name}>{role.name}</option>

                                ))}

                            </select>

                        </div>

                        {/* gender */}
                        <div className="flex flex-col gap-y-2">

                            <label className="label">Gender</label>

                            <select 
                                name="gender"  
                                className="input"
                                onChange={handleChange}
                                defaultValue={user?.gender}
                            >

                                <option value="Male" >Male</option>

                                <option value="Female" >Female</option>

                                <option value="Preffer not to say" >Preffer not to say</option>

                            </select>

                        </div>

                        {/* radio buttons */}
                        <div className="flex items-center gap-x-5 justify-around">

                            {/* isAdmin */}
                            <div className="flex items-center gap-x-2">

                                <input 
                                    type="checkbox" 
                                    className="rounded" 
                                    name="isAdmin"
                                    onChange={(e) => setFormData({...formData ,isAdmin :e.target.checked})}
                                    checked={user?.isAdmin}
                                />

                                <label  className="label">Admin</label>
                            </div>

                            {/* isMember */}
                            <div className="flex items-center gap-x-2">

                                <input 
                                    type="checkbox" 
                                    className="rounded" 
                                    name="member"
                                    onChange={() => setFormData({...formData ,member :e.target.checked})}
                                    checked={user?.member}
                                />

                                <label  className="label">Member</label>

                            </div>

                        </div>

                        {/* button */}
                        <button 
                            className="button"
                            type='submit'
                            disabled={loading || imageFileUploading}
                        >
                            {loading ? 
                            (
                                <Loading />
                            ) 
                                : 
                            ("update user")
                            }
                        </button>

                        {/* delete && sign-out */}
                        <div className="flex items-center justify-between cursor-pointer text-sm font-semibold">
                            
                            {/* delete */}
                            <span className="text-red-500 hover:underline">
                                Delete Account
                            </span>
                            

                        </div>

                        {error && (

                            <Alert color="failure">{error}</Alert>

                        )}

                    </form>

                </section>

            </>

        )}

        {!fetchingUserError && fetchingUserLoading && (

            <div className="flex items-center justify-center min-h-[60vh]">

                <Loading/>

            </div>

        )}

        {fetchingUserError && (

            <Error retry={fetchUser}/>

        )}

    </>

  )

}
