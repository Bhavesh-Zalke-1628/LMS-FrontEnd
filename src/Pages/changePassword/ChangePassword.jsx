import React from 'react'

function ChangePassword() {
    return (
        <HomeLayout>
            <div className=' w-full h-[90vh] flex items-center justify-center '>
                <div className=' w-fit h-fit px-10 py-2 flex flex-col gap-2 shadow-[0_0_10px_black] rounded-lg'>
                    <h1 className=' text-yellow-400 capitalize text-4xl font-semibold'>
                        change password
                    </h1>
                    <label
                        htmlFor="newPassword"
                        className=' text-xl text-white capitalize mt-4'
                    >
                        enter old password :
                    </label>
                    <input
                        type='password'
                        name='newPassword'
                        id='newPassword'
                        className=' bg-transparent border-2 rounded-lg px-2 py-1'
                        placeholder='Enter Old Password'
                    />
                    <label
                        htmlFor="newPassword"
                        className=' text-xl text-white capitalize mt-4'
                    >
                        enter new password :
                    </label>
                    <input
                        type='password'
                        name='newPassword'
                        id='newPassword'
                        className=' bg-transparent border-2 rounded-lg px-2 py-1'
                        placeholder='Enter Old Password'
                    />
                    <button className=' bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 py-2 text-white text-lg font-semibold capitalize mt-4 rounded-lg mb-4' type='submit'>
                        change password
                    </button>
                </div>
            </div>
        </HomeLayout>
    )
}

export default ChangePassword
