import React, { useEffect } from 'react'
import HomeLayout from '../../Layouts/HomeLayout'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCorce, getAllCourses } from '../../Redux/Slices/CourceSlice'
import { getStatData } from '../../Redux/Slices/StatSlice'
import { getPaymentRecord } from '../../Redux/Slices/RazorpaySlice'
import {Pie} from 'react-chartjs-2'
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
                data: [allUserCount, subscribedUser],
                backgroundColor: ["yellow", "green"],
                borderWidth: 1,
                borderColor: ["yellow","green"]
            },
        ]
    };

    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        fontColor: "white",
        datasets: [
            {
                label: "Sales / Month",
                data: monthlySalesRecord,
                backgroundColor: ["red"],
                borderColor: ["white"],
                borderWidth: 2
            }

        ]
    }

    const myCources = useSelector((state) => state?.courses?.courseData)

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
                // await dispatch(getAllCourses())
                // await dispatch(getStatData())
                await dispatch(getPaymentRecord())
            }
        )()
    })
    return (
        <HomeLayout>
            <div className=' w-full h-[90vh] pt-5 flex items-center justify-center gap-10 text-white'>
                <h1 className=' text-center font-semibold text-yellow-500 text-5xl'>Admin Dashboard</h1>
                <div className=' grid grid-cols-2 gap-5 m-auto mx-10'>
                    <div className=' flex flex-col items-center gap-10 p-5 shadow-lg rounded-lg'>
                        <div className=' w-80 h-80 '>
                            <Pie />
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AdminDashboard
