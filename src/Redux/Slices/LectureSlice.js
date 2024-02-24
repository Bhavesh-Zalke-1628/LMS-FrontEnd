// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import toast from 'react-hot-toast'
// import axiosInstance from '../../Helpers/axiosInstance'
// const initialState = {
//     lectures: []
// }


// export const getCourceLecture = createAsyncThunk('/course/lecture/get', async (cid) => {
//     try {
//         const response = await axiosInstance.get(`/cource/:${cid}`)
//         toast.promise(response, {
//             loading: "Wait... Fetching Course Data!!",
//             success: "Fetch data successfully",
//             error: "Failed to load data"
//         });
//         return (response).data
//     } catch (error) {
//         toast.error("error")
//     }
// })

// export const addCourseLecture = createAsyncThunk('/course/lecture/add', async (data) => {
//     try {
//         const formData = new FormData()
//         formData.append('lecture', data.lecture)
//         formData.append('title', data.title)
//         formData.append('description', data.description)
//         const response = await axiosInstance.post(`/courses/${data.id}`, formData)
//         toast.promise(response, {
//             loading: "Wait... Adding cources data!!",
//             success: "Lecture addedd successfully",
//             error: "Failed to add the lecture"
//         });
//         return (response).data
//     } catch (error) {
//         toast.error('error >',error)
//     }
// })

// export const deleteLecture = createAsyncThunk('/course/lecture/delete', async (data) => {
//     try {
//         const response = await axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`)
//         toast.promise(response, {
//             loading: "Wait... Deleting cource lecture",
//             success: "Lecture deleted successfully",
//             error: "Failed to delete the lecture"
//         });
//         return (response).data
//     } catch (error) {
//         toast.error(error)
//     }
// })


// const lectureSlice = createSlice({
//     name: 'lecture',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(getCourceLecture.fulfilled, (state, action) => {
//                 console.log(action);
//                 state.lectures = action?.payload?.lectures;
//             })
//             .addCase(addCourseLecture.fulfilled, (state, action) => {
//                 console.log(action);
//                 state.lectures = action?.payload?.course?.lectures;
//             })
//     }
// })



// export default lectureSlice.reducer

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    lectures: []
}


export const getCourseLectures = createAsyncThunk("/course/lecture/get", async (cid) => {
    try {
        const response = axiosInstance.get(`/cource/${cid}`);
        toast.promise(response, {
            loading: "Fetching course lectures",
            success: "Lectures fetched successfully",
            error: "Failed to load the lectures"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const addCourseLecture = createAsyncThunk("/course/lecture/add", async (data) => {
    try {
        const formData = new FormData();
        formData.append("lecture", data.lecture);
        formData.append("title", data.title);
        formData.append("description", data.description);

        const response = axiosInstance.post(`/cource/${data.id}`, formData);
        toast.promise(response, {
            loading: "adding course lecture",
            success: "Lecture added successfully",
            error: "Failed to add the lectures"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const deleteCourseLecture = createAsyncThunk("/course/lecture/delete", async (data) => {
    try {

        const response = axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(response, {
            loading: "deleting course lecture",
            success: "Lecture deleted successfully",
            error: "Failed to delete the lectures"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});


const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCourseLectures.fulfilled, (state, action) => {
            console.log(action);
            state.lectures = action?.payload?.lectures;
        })
            .addCase(addCourseLecture.fulfilled, (state, action) => {
                console.log(action);
                state.lectures = action?.payload?.course?.lectures;
            })
    }
});

export default lectureSlice.reducer;