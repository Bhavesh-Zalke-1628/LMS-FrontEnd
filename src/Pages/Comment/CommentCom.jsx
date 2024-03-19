import React, { useEffect } from 'react'
import { BsTrash } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCommnet } from '../../Redux/Slices/CommentSlice'


function CommentCom({ data }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleClick() {
        dispatch(deleteCommnet("hello"))
    }
    useEffect(() => {
        handleClick()
    }, []);
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
                <div className="group bg-gray-600 w-[90%] rounded-md mt-4 flex flex-col px-7 transition-all ease-in-out duration-300">
                    <h3 className=" text-yellow-400 capitalize font-semibold italic">{data?.studentName}</h3>
                    <h1>{data?.comment}</h1>
                    <p className=' flex items-end justify-end'>{data.date} </p>
                    <div className='hidden group-hover:block bg-yellow-400 py-2 px-5 mb-2 rounded-lg hover:bg-yellow-500 transition-all ease-in-out duration-300 text-black w-fit place-self-center'>
                        <BsTrash
                            onClick={handleClick}
                            className=' hover:text-red-500 transition-all ease-in-out duration-300 text-2xl'
                        />
                    </div>
                </div>
            </div >
        </>

    )
}

export default CommentCom
