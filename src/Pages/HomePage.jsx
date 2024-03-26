import React, { useEffect, useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { Link, useNavigate } from 'react-router-dom'
import HomePageImg from '../Assets/Images/homePageMainImage.png'
import { IoIosNotifications } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../Redux/Slices/CourceSlice';
import { RxCrossCircled } from 'react-icons/rx'
function HomePage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [counter, setCounter] = useState(0);
    const [show, setShow] = useState(false)
    const { data } = useSelector((state) => {
        return state?.auth
    })
    console.log(data)
    const courseData = useSelector((state) => state?.courses)
    console.log(courseData)
    const numberOfCourses = courseData.numberOfCourses
    const numberOfCoursesLocal = localStorage.getItem('numberOfCourses')
    console.log(numberOfCoursesLocal)
    // if (courseData.courseData.length > numberOfCoursesLocal) {
    //     if (numberOfCoursesLocal >= 0) {
    //         setCounte    r(0)
    //     } else {
    //         setCounter(numberOfCourses - numberOfCoursesLocal)
    //         localStorage.setItem('numberOfCourses', numberOfCourses)
    //     }
    // }

    console.log(data)
    useEffect(() => {
        dispatch(getAllCourses())
    }, []);
    return (
        <>
            <HomeLayout>
                <div className=' h-[90vh] flex flex-col items-end '>

                    {/* notification div */}
                    <div>
                        {
                            show &&
                            <div className=' absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex items-center justify-center'>
                                <div className=' w-[50%] h-3/6 rounded-lg shadow-[0_0_10px_black] flex flex-col items-center justify-center'>
                                    {
                                        localStorage.setItem('numberOfCourses', 0)
                                    }
                                </div>
                                <div>
                                    <RxCrossCircled
                                        onClick={() => setShow(false)}
                                        className='text-4xl text-white absolute top-36 cursor-pointer hover:text-red-500 transition-all ease-in-out duration-300 '
                                    />
                                </div>
                                {
                                    counter && setCounter(0)
                                }
                            </div>
                        }
                    </div>
                    <div className=' mr-10 mt-4 cursor-pointer '>
                        <div className=' absolute mt-[-1.3vh] ml-7'>
                            <p>
                                {
                                    counter > 0 &&
                                    counter
                                }
                            </p>
                        </div>
                        <IoIosNotifications
                            onClick={
                                () => setShow(!show)}
                            className='text-4xl text-yellow-400 hover:text-red-400 transition-all ease-in-out duration-300  hover:rotate-6 ' />
                    </div>
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
                </div>
            </HomeLayout>
        </>
    )
}

export default HomePage
