import React from 'react'
import TypeWriter from 'typewriter-effect'
function CommentCom({ data }) { 
    return (
        <>
            <div className="bg-gray-600  rounded-md mt-4 flex flex-col px-7  ">
                <h3 className=" text-yellow-400 capitalize font-semibold">{data?.studentName}</h3>
                <h1>{data?.comment}</h1>
                <p className=' flex items-end justify-end'>12.00 AM </p>
            </div>
        </>

    )
}

export default CommentCom
