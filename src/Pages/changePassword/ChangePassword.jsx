import React, { useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayout'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { changePassword } from '../../Redux/Slices/ChangePasswordSlice'
import { FiArrowDownLeft, FiArrowLeft } from 'react-icons/fi';
function ChangePassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [changePasswordData, setChangePasswordData] = useState({
        oldPassword: "",
        newPassword: "",
    });

    async function handleUserInput(e) {
        const { name, value } = e.target;
        setChangePasswordData({
            ...changePasswordData,
            [name]: value
        })
    }


    async function onFormSubmit(event) {
        event.preventDefault();
        console.log(changePasswordData.newPassword, changePasswordData.oldPassword)
        if (!changePasswordData.newPassword || !changePasswordData.oldPassword) {
            toast.error("Please fill all the details");
            return;
        }
        // const formData = new FormData();
        // formData.append('oldPassword', changePasswordData.oldPassword)
        // formData.append('newPassword', changePasswordData.newPassword)

        // dispatch create account action
        const response = dispatch(changePassword(changePasswordData));
        console.log(response)
        if (response?.payload?.success)
            navigate("/");

        setChangePasswordData({
            oldPassword: "",
            newPassword: ""
        })
    }

    return (
        <HomeLayout>
            <div className='flex overflow-x-auto items-center justify-center h-[100vh]'>
                <form noValidate onSubmit={onFormSubmit} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
                    <h1 className="text-center text-2xl font-bold text-yellow-400 capitalize">Change password</h1>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="" className='font-semibold'> Password </label>
                        <input
                            type="password"
                            required
                            name='oldPassword'
                            id='oldPassword'
                            placeholder="Enter your old password.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={changePasswordData.oldPassword}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="" className='font-semibold'> Password </label>
                        <input
                            type="password"
                            required
                            name='newPassword'
                            id='newPassword'
                            placeholder="Enter your new password.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={changePasswordData.newPassword}
                        />
                    </div>

                    <button type="submit" className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer capitalize'>
                        change password
                    </button>
                
                <div className=' flex items-center justify-center gap-2 text-accent cursor-pointer'
                onClick={() => navigate(-1)}>
                    <FiArrowLeft/>
                    do not change password
                </div>
                </form>
            </div>
        </HomeLayout>
    )
}

export default ChangePassword
