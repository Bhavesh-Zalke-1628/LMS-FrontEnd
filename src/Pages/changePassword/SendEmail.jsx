import React, { useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayout'
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { sendEmail } from '../../Redux/Slices/ChangePasswordSlice'

function SendEmail() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [emailData, setEmailData] = useState({
        email: ""
    })
    function handleUserInput(e) {
        const { name, value } = e.target;
        setEmailData({
            ...emailData,
            [name]: value
        })
    }

    async function onsubmit(e) {
        e.preventDefault()
        if (!emailData.email) {
            toast.error("Please enter your email")
            return
        }

        const formData = new FormData();
        formData.append('email', emailData.email)
        const response = await dispatch(sendEmail(formData))
        if (response?.payload?.success) {
            toast.success("Email sent successfully")
            // navigate("/")

        } 
    }

    console.log(emailData.email)
    return (
        <HomeLayout>
            <div className=' h-[90vh] flex items-center justify-center'>
                <div className='w-[30%] h-fit px-5 py-3 rounded-lg  shadow-[0_0_10px_black]'>
                    <h1 className=' text-center text-4xl text-yellow-400 capitalize'>
                        send email
                    </h1>
                    <form
                        onSubmit={onsubmit}
                        className=' flex flex-col'>
                        <label
                            htmlFor="email"
                            className=' text-lg mt-2 text-white'
                        >
                            Enter your email :
                        </label>
                        <input
                            type='email'
                            className=' bg-transparent border-2 rounded-lg mt-2 px-2 py-1'
                            placeholder='Enter your email'
                            name='email'
                            value={emailData.email}
                            onChange={handleUserInput}
                        />
                        <button
                            type='submit'
                            className=' bg-yellow-400 mt-4 py-2 rounded-lg text-white text-2xl font-semibold capitalize hover:bg-yellow-500 cursor-pointer'
                        >
                            send link
                        </button>
                        <p
                            onClick={() => {
                                navigate(-1)
                            }}
                            className=' text-center flex items-center justify-center mt-3 gap-1 text-accent cursor-pointer'
                        >
                            <BiArrowBack className=' mt-1' />
                            <span>Do not change the password</span>
                        </p>
                    </form>
                </div>
            </div>
        </HomeLayout>
    )
}

export default SendEmail
