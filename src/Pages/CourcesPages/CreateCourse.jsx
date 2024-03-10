import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { creatNewCourse } from "../../Redux/Slices/CourceSlice";

function CreateCourse() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userInput, setUserInput] = useState({
        title: "",
        description: "",
        categeory: "",
        createdBy: "",
        thumbnails: null,
        previewImage: ""
    })


    // Cource Thmbnails
    // function handleImageInout(e) {
    //     // e.prevenetDefault();
    //     e.preventDefault()
    //     const uploadedImg = e.target.files[0];
    //     if (uploadedImg) {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(uploadedImg)
    //         // console.log(this.result)
    //         fileReader.addEventListener('load', function () {
    //             setUserInput({
    //                 ...userInput,
    //                 previewImage: this.result,
    //                 thubmnails: uploadedImg
    //             })
    //         })
    //     }
    // }

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        console.log(e.target.files[0])
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnails: uploadedImage
                })
            })
        }
    }




    function handleUserInput(event) {
        const { name, value } = event.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    async function onFormSubmit(event) {
        event.preventDefault()
        if (!userInput.thumbnails || !userInput.title || !userInput.createdBy || !userInput.categeory || !userInput.description) {
            toast.error("All  fields are required")
        }

        const response = await dispatch(creatNewCourse(userInput))
        console.log(response.payload)
        if (response?.payload?.success) {
            setUserInput({
                title: "",
                categeory: "",
                createdBy: "",
                description: "",
                thumbnails: null,
                previewImage: ""
            })
        }
        navigate('/cources');
    }
    return (
        <HomeLayout>
            <div className=" flex items-center justify-center h-[90vh]">

                <form
                    noValidate
                    onSubmit={onFormSubmit}
                    className=" flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
                >
                    <Link className=" absolute top-8 text-2xl link text-accent cursor-pointer">
                        <AiOutlineArrowLeft />
                    </Link>
                    <h1 className=" text-center text-2xl font-bold">
                        Create New cource
                    </h1>
                    <main className=" grid grid-cols-2 gap-x-8">
                        <div className=" gap-y-6 ">
                            <div >
                                <label
                                    htmlFor="imageUpload"
                                    className=" cursor-pointer">
                                    {userInput.previewImage ? (
                                        <img
                                            src={userInput.previewImage}
                                            alt=""
                                            className=" w-full h-52 m-auto border"
                                        />
                                    ) : (
                                        <div className=" w-full h-44 m-auto flex items-center justify-center border rounded-md">
                                            <h1 className=" font-bold text-lg">
                                                Upload Your Cource thumbnails
                                            </h1>
                                        </div>
                                    )}
                                </label>
                                <input
                                    type='file'
                                    className=" hidden"
                                    id="imageUpload"
                                    accept=".jpg, .jpeg, .png"
                                    name="imageUploads"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <div className=" flex flex-col gap-1 ">
                                <label className=" text-lg font-semibold " htmlFor="title">
                                    Cource title
                                </label>
                                <input
                                    type="text"
                                    required
                                    name="title"
                                    id="title"
                                    placeholder="Enter Cource title"
                                    value={userInput.title}
                                    onChange={handleUserInput}
                                    className=" bg-transparent px-2 py-1 border rounded-md"
                                />
                            </div>
                        </div>
                        {/* Instructor */}
                        <div className=" flex flex-col gap-1">
                            <div className=" flex flex-col gap-1 ">
                                <label className=" text-lg font-semibold " htmlFor="createdBy">
                                    Instructor Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    name="createdBy"
                                    id="createdBy"
                                    placeholder="Enter Instructor Name "
                                    value={userInput.createdBy}
                                    onChange={handleUserInput}
                                    className=" bg-transparent px-2 py-1 border rounded-md"
                                />
                            </div>
                            {/* categeory */}
                            <div className=" flex flex-col gap-1 mt-2">
                                <label className=" text-lg font-semibold " htmlFor="categeory">
                                    Course Categeory
                                </label>
                                <input
                                    type="text"
                                    required
                                    name="categeory"
                                    id="categeory"
                                    placeholder="Enter course categeroy"
                                    value={userInput.categeory}
                                    onChange={handleUserInput}
                                    className=" bg-transparent px-2 py-1 border rounded-md"
                                />
                            </div>
                            {/* Cource description */}
                            <div className=" flex flex-col gap-1 mt-2">
                                <label className=" text-lg font-semibold " htmlFor="description">
                                    Course Description
                                </label>
                                <textarea
                                    type="text"
                                    required
                                    name="description"
                                    id="description"
                                    placeholder="Enter course description"
                                    value={userInput.description}
                                    onChange={handleUserInput}
                                    className=" bg-transparent px-2 py-1 border rounded-md h-24 overflow-x-hidden resize-none"
                                />
                            </div>
                        </div>
                    </main>
                    <button
                        type='submit'
                        className=" w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 py-2 text-xl font-semibold rounded-md cursor-pointer"
                    >
                        Create Cource
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default CreateCourse;