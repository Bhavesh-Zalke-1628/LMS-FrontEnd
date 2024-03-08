
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";
import axios from "axios";

const initialState = {
    lectures: [],  
    Comment: ""
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

export const addCourseLecture = createAsyncThunk("/course/addlecture", async (data) => {
    try {
        console.log('addCourseLecture data', data)
        const formData = new FormData();
        formData.append("lecture", data.lecture);
        formData.append("title", data.title);
        formData.append("description", data.description);
        console.log(data.id)
        const response = await axiosInstance.post(`/cource/${data.id}`, formData);
        toast.promise(response, {
            loading: "Adding course lecture",
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

        const response = await axiosInstance.delete(`/cource?courseId=${data.courseId}&lectureId=${data.lectureId}`);
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


export const addComment = createAsyncThunk('/add/comment', async (data) => {
    console.log(data[0][0])
    const response = await axios.post(`http://localhost:5000/api/cource/${data[0][0]}/comment/${data[0][0]}`)
    console.log(data[1])
    // toast.promise(response, {
    //     loading: "Adding comment",
    //     success: "Comment add successfully",
    //     error: "Failed to add comment"
    // })
    // return (await response).data
})

const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCourseLectures.fulfilled, (state, action) => {
                state.lectures = action.payload.cource.lectures
            })
            .addCase(addCourseLecture.fulfilled, (state, action) => {
                console.log(action);
                state.lectures = action?.payload?.course?.lectures;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.Comment = action.payload
            })
    }
});

export default lectureSlice.reducer;