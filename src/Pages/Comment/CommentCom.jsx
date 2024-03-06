import React from 'react'
import TypeWriter from 'typewriter-effect'
function CommentCom({ data }) {
    console.log('componen data',data)
    return (
        <>

            <div className="bg-gray-600  rounded-md mt-4 flex flex-col px-7">
                <h3 className=" text-yellow-400 capitalize font-semibold">{data?.studentId}</h3>
                <h1>{data?.comment}</h1>
            </div>
        </>

    )
}

export default CommentCom
