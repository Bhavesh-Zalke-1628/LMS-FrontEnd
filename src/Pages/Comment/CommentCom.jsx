import React from 'react'
import TypeWriter from 'typewriter-effect'
function CommentCom({ data }) {
    console.log(data.photo)
    return (
        <>
            <div className=' flex  gap-2'>
                <div className=' w-[12%] mt-4 rounded-full'>
                    {
                        data?.photo ? (
                            <img
                                src={data?.photo}
                                alt="userPhoto"
                            className=' rounded-full w-32'
                            />
                        )
                            : (
                                < h1 className=' capitalize py-1 bg-yellow-400 flex items-center justify-center text-gray-100 h-fit font-bold text-xl rounded-full'>
                                    {data?.studentName.charAt(0)}
                                </h1>
                            )
                    }
                </div>
                <div className="bg-gray-600 w-[90%] rounded-md mt-4 flex flex-col px-7  ">
                    <h3 className=" text-yellow-400 capitalize font-semibold italic">{data?.studentName}</h3>
                    <h1>{data?.comment}</h1>
                    <p className=' flex items-end justify-end'>{data.date} </p>
                </div>
            </div >
        </>

    )
}

export default CommentCom
