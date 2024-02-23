import React from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { Link } from 'react-router-dom'
import HomePageImg from '../Assets/Images/homePageMainImage.png'
function HomePage() {
    return (
        <>
            <HomeLayout>
                <div className='pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]'>
                    <div className='w-1/2 space-y-6'>
                        <h1 className=' text-5xl font-semibold capitalize'>
                            find out best
                            <span className=' text-yellow-500 font-bold'> Online Cources</span>
                        </h1>
                        <p className=' text-xl text-gray-200'>
                            We have a large library of cources though by highly skilled and qulified faculty at a very afordable cost.
                        </p>
                        <div className=' space-x-6'>
                            <Link to='/cources'>
                                <button className=' bg-yellow-500 px-5 py-3 rounded-md capitalize font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300'>
                                    explore cources
                                </button>
                            </Link>

                            <Link to='/contact'>
                                <button className=' border border-yellow-500 px-5 py-3 rounded-md capitalize font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300'>
                                    contact us
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className=' w-1/2 flex items-center justify-center'>
                        <img src={HomePageImg} alt="home page img" />
                    </div>
                </div>
            </HomeLayout>
        </>
    )
}

export default HomePage
