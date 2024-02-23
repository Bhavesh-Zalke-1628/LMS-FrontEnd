import React, { useEffect, useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLecture, getCourceLecture } from '../Redux/Slices/LectureSlice';
function Displaylecture() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { state } = useLocation()
    const { lectures } = useSelector(async (state) => state.lecture)
    console.log(lectures)
    const { role } = useSelector((state) => state.auth)

    console.log(role)

    async function onLectureDelete(courceId, lectureId) {
        console.log(courceId, lectureId)
        await dispatch(deleteLecture({ courceId: courceId, lectureId: lectureId }))
        await getCourceLecture(courceId)
    }

    const [currentVideo, setCurrentVideo] = useState(0)
    useEffect(() => {
        if (!state)
            navigate('/cources')
        console.log(state)
        dispatch(getCourceLecture(state._id))

    }, []);

    return (
        <HomeLayout>
            <div className=' min-h-[90vh] flex flex-col items-center justify-center gap-10 py-10 text-white mx-5'>
                <div className=' text-center text-2xl font-semibold text-yellow-500'>
                    Course Name : {state?.title}
                </div>
                {/* {lectures && lectures.lenght > 0 && */}
                <div className=' flex flex-row justify-center gap-10 w-full '>
                    {/* left section for playing video and display the course details */}
                    <div className=' space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]'>
                        <video
                            // src={state && lectures[currentVideo]?.lecture?.secure_url}
                            className=' object-fill rounded-tl-lg rounded-tr-lg w-full'
                            controls
                            disablePictureInPicture
                            muted
                            controlsList='nodownload'
                        >
                        </video>
                        <div>
                            <h1>
                                <span className=' text-yellow-500'>
                                    Title {" : "}
                                </span>
                                {/* {lectures?.lectures[currentVideo]?.title} */}
                                This is the first lecture
                            </h1>
                            <p>

                                <span className=' text-yellow-500'>
                                    Description {" : "}
                                </span>
                                {/* {lectures?.lectures[currentVideo]?.description} */}
                                This is the description
                            </p>
                        </div>
                    </div>
                    {/* Right section for display the  list of lecture  */}
                    <ul className=' w-[28rem] rounded-lg shadow-[0_0_10px_black] space-y-4'>
                        <li className=' font-semibold text-yellow-500 flex items-center text-xl p-4'>
                            <p>Lecture List</p>
                            {role == "Admin" && (
                                <button
                                    onClick={() => navigate('/course/addlecture')}
                                    className=' btn-primary px-2 py-1 rounded-md font-semibold text-sm'>Add New Lecture
                                </button>
                            )}
                        </li>
                        {lectures &&
                            lectures.map((lecture, index) => {
                                return (
                                    <li
                                        className=' space-y-2'
                                        key={lecture._id}
                                    >
                                        <p className=' cursor-pointer ' onClick={setCurrentVideo(index)}>
                                            <span className=''>
                                                {" "} Lecture  : {index + 1} : {" "}
                                            </span>
                                            {lecture?.title}
                                        </p>
                                        {role == "Admin" && (
                                            <button
                                                onClick={() => onLectureDelete(state?._id, lecture?._id)}
                                                className=' btn-accent px-2 py-1 rounded-md font-semibold text-sm'>
                                                Delete Lecture
                                            </button>
                                        )}
                                    </li>
                                )
                            })}
                    </ul>
                </div>
                {/* }    */}
            </div>
        </HomeLayout>
    )
}

export default Displaylecture
