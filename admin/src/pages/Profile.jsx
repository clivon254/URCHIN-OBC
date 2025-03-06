

import React, { useContext, useEffect, useRef, useState } from 'react'
import { StoreContext } from '../context/store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import { app } from '../firebase'
import { signOutSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice'
import axios from "axios"
import { toast } from 'sonner'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Alert } from 'flowbite-react'
import { IoMdEyeOff } from 'react-icons/io'
import { IoEye } from 'react-icons/io5'
import Loading from '../components/Loading'




export default function Profile() {

    const {url,token} = useContext(StoreContext)

    const {loading , error , currentUser} = useSelector(state => state.user)

    const [formData , setFormData] = useState({})

    const [imageFile , setImageFile] = useState(null)

    const [imageFileUrl , setImageFileUrl] = useState(null)

    const [imageFileUploading , setImageFileUploading] = useState(false)

    const [imageFileUploadingProgress , setImageFileUploadingProgress] = useState(null)

    const [imageFileUploadError , setImageFileUploadError] = useState(null)

    const filePickerRef = useRef()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [showPassword , setShowPassword] = useState(false)



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
            dispatch(updateUserStart())

            const res = await axios.put(url + `/api/user/update-user/${currentUser._id}`,formData)

            if(res.data.success)
            {
                dispatch(updateUserSuccess(res.data.rest))

                toast.success("Profile updated successfully")
            }

        }
        catch(error)
        {

            if(error.response)
            {
                const errorMessage = error.response.data.Message 

                dispatch(updateUserFailure(errorMessage))
            }
            else
            {
                dispatch(updateUserFailure(error.message))
            }

        }

    }


    // handleSignOut
    const handleSignOut = () => {

        try
        {
            dispatch(signOutSuccess())

            navigate("/sign-in")

            toast.success("you have signed out")
        }
        catch(error)
        {
            console.log(first)
        }

    }

    console.log(formData)

  return (

    <section className="w-full p-5 space-y-10">

        <h2 className="title3 text-center">Profile</h2>

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
                    src={imageFileUrl || currentUser?.profilePicture}
                    alt="user" 
                    className={`rounded-full w-full h-full object-cover border-8
                        ${imageFileUploadingProgress && imageFileUploadingProgress < 100 && `opacity-${imageFileUploadingProgress}`}`} 
                />

            </div>

            {imageFileUploadError && (

                <Alert color="failure"> {imageFileUploadError} </Alert>

            )}

            {/* email */}
            <input 
                type="email" 
                className="input" 
                placeholder="name@example.com"
                name="email"
                onChange={handleChange}
                defaultValue={currentUser?.email}
            />

            {/* username*/}
            <input 
                type="text" 
                className="input" 
                placeholder="name@example.com"
                name="username"
                onChange={handleChange}
                defaultValue={currentUser?.username}
            />

            {/* password */}
            <div className="w-full relative">
            
                <input 
                    type={showPassword ? "text" :"password"}
                    className="input" 
                    placeholder='***********'
                    name="password"
                    onChange={handleChange}
                />

                <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    {showPassword ? 
                        (<IoMdEyeOff size={20} className=""/>)
                        :
                        (<IoEye size={20} className=""/>)
                    }
                </button>

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
                
                {/* sign out */}
                <span className="text-red-500 hover:underline ">
                    sign out
                </span>

            </div>

            {error && (

                <Alert color="failure">{error}</Alert>

            )}

        </form>

    </section>

  )

}
