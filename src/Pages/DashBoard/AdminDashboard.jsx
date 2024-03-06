import React, { useEffect } from 'react'
import HomeLayout from '../../Layouts/HomeLayout'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCorce, getAllCourses } from '../../Redux/Slices/CourceSlice'
import { getStatData } from '../../Redux/Slices/StatSlice'
import { getPaymentRecord } from '../../Redux/Slices/RazorpaySlice'
import { Bar, Pie } from 'react-chartjs-2'
import { FaUsers } from 'react-icons/fa'
import { FcSalesPerformance } from 'react-icons/fc'
import { GiMoneyStack } from 'react-icons/gi'
import { BsCollectionPlayFill, BsTrash } from 'react-icons/bs'
ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip)
function AdminDashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { allUserCount, subscribedUser } = useSelector((state) => state?.state)
    console.log(allUserCount, subscribedUser)
    const { allPayments, finalMonths, monthlySalesRecord } = useSelector((state) => state?.razorpay)
    console.log(allPayments, finalMonths, monthlySalesRecord)


    const userData = {
        labels: ["Registered User", "Enrolled User"],
        fontColor: "white",
        datasets: [
            {
                label: "User Details",
                data: [10, 20],
                backgroundColor: ["yellow", "green"],
                borderWidth: 1,
                borderColor: ["yellow", "green"]
            },
        ]
    };

    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        fontColor: "white",
        datasets: [
            {
                label: "Sales / Month",
                data: [10, 20, 10, 5, 1, 2, 4, 5, 8, 42, 11],
                backgroundColor: ["red"],
                borderColor: ["white"],
                borderWidth: 2
            }

        ]
    }

    const { courseData } = useSelector((state) => {
        return state.courses
    });

    async function onCourceDelte(id) {
        if (window.confirm("Are you want to delete the cource")) {
            const res = await dispatch(deleteCorce(id))
            if (res?.payload?.success) {
                await dispatch(getAllCourses())
            }
        }

    }

    useEffect(() => {
        (
            async () => {
                await dispatch(getAllCourses());
                await dispatch(getStatData());
                await dispatch(getPaymentRecord())
            }
        )()
    }, [])
    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
                <h1 className=' text-center font-semibold text-yellow-500 text-5xl'>Admin Dashboard</h1>
                <div className=' grid grid-cols-2 gap-5 m-auto mx-10'>
                    <div className=' flex flex-col items-center gap-10 p-5 shadow-lg rounded-lg'>
                        <div className=' w-80 h-80 '>
                            <Pie data={userData} />
                        </div>
                        <div className=' grid grid-cols-2 gap-5'>
                            <div className=' flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
                                <div className='  flex flex-col items-center'>
                                    <p className=' font-semibold capitalize'>Register user</p>
                                    <h3 className=' text-4xl font-bold'>{10}</h3>
                                </div>
                                <FaUsers className=' text-yellow-500 text-5xl' />
                            </div>
                            <div className=' flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
                                <div className='  flex flex-col items-center'>
                                    <p className=' font-semibold capitalize'>subscribed user</p>
                                    <h3 className=' text-4xl font-bold'>{20}</h3>
                                </div>
                                <FaUsers className=' text-green-500 text-5xl' />
                            </div>

                        </div>

                    </div>
                    <div className=' flex flex-col items-center gap-10 p-5 shadow-lg rounded-md'>
                        <div className=' h-80 w-full relative'>
                            <Bar className=' absolute bottom-0 h-80 w-full' data={salesData} />
                        </div>
                        <div className=' grid grid-cols-2 gap-5'>

                            <div className=' flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
                                <div className='  flex flex-col items-center'>
                                    <p className=' font-semibold capitalize'>subscription Count</p>
                                    <h3 className=' text-4xl font-bold'>{subscribedUser}</h3>
                                </div>
                                <FcSalesPerformance className=' text-green-500 text-5xl' />
                            </div>

                            <div className=' flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
                                <div className='  flex flex-col items-center'>
                                    <p className=' font-semibold capitalize'>total revenue</p>
                                    <h3 className=' text-4xl font-bold'>{10000}</h3>
                                </div>
                                <GiMoneyStack className=' text-green-500 text-5xl' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' m-[10px] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10'>
                    <div className='  flex w-full items-center justify-between'>
                        <h1 className=' text-3xl text-center font-semibold capitalize'>courses overview</h1>
                    </div>
                    <button
                        onClick={() => {
                            navigate('/course/create')
                        }}
                        className=' w-fit  bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-md px-4 py-2 text-xl font-semibold cursor-pointer capitalize'
                    >
                        create new Course
                    </button>
                    <table className=' table overflow-x-scroll'>
                        <thead>
                            <tr>
                                <th>sr No</th>
                                <th>Cource Title</th>
                                <th>Cource Categeory</th>
                                <th>Cource instructor</th>
                                <th>Lectures</th>
                                <th>Description</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                courseData.map((course, idx) => {
                                    return <tr key={course._id}>
                                        <td>
                                            {idx + 1}
                                        </td>
                                        <td>
                                            <textarea
                                                readOnly
                                                value={course.title}
                                                className=' w-40 h-auto bg-transparent resize-none'
                                            >
                                            </textarea>
                                        </td>
                                        <td>
                                            {course?.categeory}
                                        </td>
                                        <td>
                                            {course?.createdBy}
                                        </td>
                                        <td className=' text-center'>
                                            {course?.numberOfLecture}
                                        </td>
                                        <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                                            <textarea
                                                value={course?.description}
                                                readOnly
                                                className="w-80 h-auto bg-transparent resize-none"
                                            >

                                            </textarea>
                                        </td>
                                        <td className="flex items-center gap-4">
                                            <button
                                                className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                                onClick={() => navigate("/course/dispalylecture", { state: { ...course } })}
                                            >
                                                <BsCollectionPlayFill />
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                                onClick={() => onCourceDelte(course?._id)}
                                            >
                                                <BsTrash />
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </HomeLayout >
    )
}

export default AdminDashboard
