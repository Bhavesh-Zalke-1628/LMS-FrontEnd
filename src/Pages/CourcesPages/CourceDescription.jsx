import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import HomeLayout from '../../Layouts/HomeLayout';
import { useDispatch, useSelector } from 'react-redux';
function CourceDescription() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { state } = useLocation()

    const { role, data } = useSelector((state) => state.auth)

    return (
        <HomeLayout>
            <div className=' min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white'>
                <div className=' grid grid-cols-2 gap-10 py-10 relative'>
                    <div className=' space-y-5'>
                        <img
                            className=' w-full h-64 rounded-xl'
                            src={state?.thumbnails?.secure_url}
                            alt="thumbnail" />
                        <div className=' space-y-4'>
                            <div className=' flex items-center justify-between flex-col text-xl'>
                                <p className=' font-semibold'>
                                    <span className=' text-yellow-500 font-bold capitalize'>Totoal Lecture : </span>
                                    {
                                        state?.numbersOfLectures

                                    }
                                </p>
                                <p className=' font-semibold'>
                                    <span className=' text-yellow-500 font-bold'>Instructor : </span>
                                    {
                                        state?.createdBy

                                    }
                                </p>
                            </div>
                            {
                                role === "Admin" || data?.subscription?.status === "InActive" ? (
                                    <button className=' bg-yellow-600 w-full text-xl rounded-md font-bold py-2 px-3 hover:bg-yellow-500 transition-all ease-in-out duration-300'>
                                        Watch Lecture
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            navigate('/checkout')
                                        }}
                                        className=' w-full bg-yellow-600 text-xl rounded-md font-bold px-3 py-2 hover:bg-yellow-500 transition-all ease-in-out duration-300'>
                                        Subscribe
                                    </button>
                                )
                            }
                        </div>
                    </div>
                    <div className=' space-y-2 text-xl '>
                        <h1 className=' text-3xl font-bold text-yellow-500 mb-4 text-center'>
                            {state?.title}
                        </h1>
                        <p className=' text-yellow-500 mt-2 text-center'>
                            Cource Description
                        </p>
                        <p className=' text-white'>
                            {state?.description}
                        </p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default CourceDescription
