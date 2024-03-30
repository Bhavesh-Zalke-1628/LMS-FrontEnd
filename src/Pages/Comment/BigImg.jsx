import { data } from 'autoprefixer'
import React from 'react'
import { RxCrossCircled } from 'react-icons/rx'

function BigImg({ data }) {
    return (
        <div className=' absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex items-center justify-center'>
            <div className=' w-[50%] h-3/6 rounded-lg shadow-[0_0_10px_black] flex flex-col items-center justify-center'>
                <img
                    src={data?.photo}
                    alt="profile img"
                    className=' w-full h-full rounded-2xl px-2 py-3 hover:rotate-2'
                />
                <h1 className=' capitalize text-yellow-400 italic'>
                    {data?.studentName}
                </h1>
            </div>
            <div>
                <RxCrossCircled
                    className='text-4xl text-white absolute top-36 cursor-pointer hover:text-red-500 transition-all ease-in-out duration-300 '
                />
            </div>

        </div>

    )
}

export default BigImg
