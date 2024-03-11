import React, { useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayout'
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function SendEmail() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")

    function handleUserInput(e) {
        const { name, value } = e.target.value
        setEmail(
            ...email
            [name] = value
        )
    }

    console.log(email)
    return (
        <HomeLayout>
            <div className=' h-[90vh] flex items-center justify-center'>
                <div className='w-[30%] h-fit px-5 py-3 rounded-lg  shadow-[0_0_10px_black]'>
                    <h1 className=' text-center text-4xl text-yellow-400 capitalize'>
                        send email
                    </h1>
                    <form className=' flex flex-col'>
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
                            value={email}
                            onChange={handleUserInput}
                        />
                        <button
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
