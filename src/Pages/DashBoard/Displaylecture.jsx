import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addComment, deleteCourseLecture, getCourseLectures } from '../../Redux/Slices/LectureSlice.js'
import HomeLayout from '../../Layouts/HomeLayout.jsx'
import CommentCom from "../Comment/CommentCom.jsx";
import toast from "react-hot-toast";
import TypewriterComponent from "typewriter-effect";
import { combineReducers } from "@reduxjs/toolkit";
function Displaylectures() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { lectures } = useSelector((state) => state.lecture);
    const { role } = useSelector((state) => state.auth);
    const data = useSelector((state) => state?.auth?.data)
    const [currentVideo, setCurrentVideo] = useState(0);
    const [commentData, setCommenntData] = useState({
        comment: ""
    })


    async function onLectureDelete(courseId, lectureId) {
        await dispatch(deleteCourseLecture({ courseId: courseId, lectureId: lectureId }));
        await dispatch(getCourseLectures(courseId));
    }


    function handleUserInput(e) {
        const { name, value } = e.target;
        setCommenntData({
            ...commentData,
            [name]: value
        })
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        if (!commentData.comment) {
            toast.error("Add comment please !!")
        }
        const x = [
            state._id,
            lectures[currentVideo]._id
        ]
        const formData = new FormData()
        formData.append('comment', commentData.comment)
        const res = dispatch(addComment([x, formData]))
        if (res.payload.success)
            setCommenntData('')

    }
    useEffect(() => {
        if (!state) navigate("/cources");
        dispatch(getCourseLectures(state._id));
    }, []);

    return (

        <HomeLayout>

            <div className="flex flex-col gap-10 items-center justify-center h-[90vh] py-10 text-wihte mx-[5%] ">
                <div className="text-center text-2xl font-semibold text-yellow-500">

                    Course Name: {state?.title}
                </div>
                {(lectures && lectures.length > 0) ?
                    (<div className="flex justify-center gap-10 w-full">
                        {/* left section for playing videos and displaying course details to admin */}
                        <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                            <video
                                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                                controls
                                disablePictureInPicture
                                muted
                                controlsList="nodownload"

                            >
                            </video>
                            <div>
                                <h1>
                                    <span className="text-yellow-500"> Title: {" "}
                                    </span>
                                    {lectures && lectures[currentVideo]?.title}
                                </h1>
                                <p>
                                    <span className="text-yellow-500 line-clamp-4">
                                        Description: {" "}
                                    </span>
                                    {lectures && lectures[currentVideo]?.description}
                                </p>
                            </div>
                            {
                                role == "User" &&
                                <div>
                                    <p className=" text-xl font-bold text-yellow-500">
                                        Comment :-
                                    </p>
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="flex flex-col gap-2">
                                            <div className=" flex gap-10">
                                                <input
                                                    type="text"
                                                    name="comment"
                                                    id="comment"
                                                    value={commentData.comment}
                                                    onChange={handleUserInput}
                                                    placeholder="Enter your comment"
                                                    className=" px-4 py-1 font-semibold border bg-transparent border-white rounded-md mt-2   outline-none "
                                                />
                                                <button
                                                    type='submit'
                                                    className=" px-5 bg-yellow-400 py-1 mt-2 text-white text-xl rounded-md text-center font-semibold cursor-pointer capitalize hover:bg-white hover:text-yellow-400 hover:border-yellow-500 outline transition-all ease-in-out duration-400">
                                                    send
                                                </button>
                                            </div>
                                            {
                                                <p className=" text-white font-semibold text-xl rounded-lg shadow-[0_0_10px_black] w-fit text-center px-4 py-1 mt-2">
                                                    comments : {
                                                        lectures[currentVideo].comments.length
                                                    }
                                                </p>
                                            }
                                            <div className=" shadow-[0_0_10px_black] overflow-auto max-h-28 px-5 rounded-e-lg cursor-pointer">

                                                {
                                                    lectures[currentVideo].comments ? (

                                                        lectures[currentVideo].comments.map((ele) => {
                                                            return <CommentCom key={ele._id} data={ele} />
                                                        })
                                                    ) : (
                                                        <h1 className=" text-yellow-400">No comment</h1>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            }
                        </div>
                        {/* right section for displaying list of lectres */}
                        <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                            <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                                <p>Lectures list</p>
                                {role === "Admin" && (
                                    <button onClick={() => navigate("/course/addlecture", { state: { ...state } })} className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                                        Add new lecture
                                    </button>
                                )}
                            </li>
                            {lectures &&
                                lectures.map((lecture, idx) => {
                                    return (
                                        <li className="space-y-2" key={lecture._id} >
                                            <p className="cursor-pointer" onClick={() => setCurrentVideo(idx)}>
                                                <span>
                                                    {" "} Lecture {idx + 1} : {" "}
                                                </span>
                                                {lecture?.title}
                                            </p>
                                            {role === "Admin" && (
                                                <button onClick={() => onLectureDelete(state?._id, lecture?._id)} className=" bg-yellow-600 border-2 px-2 py-1 rounded-md font-semibold text-sm">
                                                    Delete lecture
                                                </button>
                                            )}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>) : role && role === "Admin" && (
                        <button
                            type='submit'
                            onClick={() => navigate("/course/addlecture", { state: { ...state } })}
                            className=" border text-white px-3 py-2 rounded-md font-semibold text-xl">
                            Add new lecture
                        </button>
                    )
                }
            </div>
        </HomeLayout >

    );
}

export default Displaylectures;