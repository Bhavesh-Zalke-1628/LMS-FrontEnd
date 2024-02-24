import React, { useEffect, useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addCourseLecture } from '../Redux/Slices/LectureSlice';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function Addlecture() {
    const courceDetails = useLocation().state;
    console.log(courceDetails)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userInput, setUserInput] = useState({
        id: courceDetails.id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: ""
    })

    function handleInputChange(e) {
        const { name, value } = e.target
        e.preventDefault()

        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    function handleVideo(e) {
        const video = e.target.files[0]
        const source = window.URL.createObjectURL(video)
        console.log(source)
        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc: source
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault()
        if (!userInput.lecture || !userInput.title || !userInput.description) {
            toast.error("All fields are required")
            return
        }

        const respose = await dispatch(addCourseLecture(userInput));

        if (respose?.payload?.success) {
            setUserInput({
                id: courceDetails.id,
                lecture: undefined,
                title: "",
                description: "",
                videoSrc: ""
            })
        }
        navigate('/course/dispalylecture')
    }

    useEffect(() => {
        if (!courceDetails) {
            navigate('//course/dispalylecture')
        }
    }, []);
    return (
        <HomeLayout>
            <div className=' h-[90vh] text-white flex items-center justify-center gap-10 mx-16'>
                <div className=' flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg'>
                    <header className=' flex items-center justify-center relative'>
                        <button
                            className=' absolute left-2 text-xl text-green-500'
                            onClick={() => navigate(-1)}>
                            <AiOutlineArrowLeft />
                        </button>
                        <h1 className=' text-cl text-yellow-500  font-semibold'>
                            Add new Flecture
                        </h1>
                    </header>
                    <form
                        onSubmit={onFormSubmit}
                        className=' flex flex-col gap-3'
                    >
                        <input
                            type="text"
                            name='title'
                            placeholder='Enter the title  of the lecture'
                            onChange={handleInputChange}
                            className=' bg-transparent px-3 py-1 border rounded-lg'
                            value={userInput.title}
                        />
                        <textarea
                            type="text"
                            name='description'
                            placeholder='Enter the description of the lecture'
                            onChange={handleInputChange}
                            className=' bg-transparent px-3 py-1 border rounded-lg resize-none overflow-y-scroll h-36'
                            value={userInput.description}
                        />

                        {userInput.videoSrc ? (
                            < video
                                src={userInput.videoSrc}
                                muted
                                controls
                                controlsList='nodownload no fullscreen'
                                disablePictureInPicture
                                className=' object-fill rounded-tl-lg rounded-tr-lg w-full'
                            >

                            </video>
                        ) : (
                            <div className=' h-48 border flex items-center justify-center cursor-pointer'>
                                <label htmlFor='lecture' className=' font-semibold text-xl cursor-pointer'>Chose your video</label>
                                <input
                                    type="file"
                                    className=' hidden'
                                    name='lecture'
                                    onChange={handleVideo}
                                    id='lecture'
                                    accept='video/mp4 video/*'
                                />
                            </div>

                        )}
                    </form>
                    <button
                        className=' btn-primary py-1 font-semibold text-lg'
                        type='submit'>
                        Add new Lecture
                    </button>
                </div>
            </div>
        </HomeLayout >
    )
}

export default Addlecture



// /22 min


