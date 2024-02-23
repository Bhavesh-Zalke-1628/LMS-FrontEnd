import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosInstance from '../../Helpers/axiosInstance'
import { Form } from 'react-router-dom'
const initialState = {
    lectures: []
}


export const getCourceLecture = createAsyncThunk('/course/lecture/get', async (cid) => {
    try {
        const response = await axiosInstance.get(`/cources/${cid}`)
        toast.promise(response, {
            loading: "Wait... Fetching Course Data!!",
            success: "Fetch data successfully",
            error: "Failed to load data"
        });
        return (response).data
    } catch (error) {
        toast.error(error?.response?.data?.error)
    }
})

export const addCourseLecture = createAsyncThunk('/course/lecture/add', async (data) => {
    try {
        const formData = new FormData()
        formData.append('lecture', data.lecture)
        formData.append('title', data.title)
        formData.append('description', data.description)
        const response = await axiosInstance.post(`/courses/${data.id}`, formData)
        toast.promise(response, {
            loading: "Wait... Adding cources data!!",
            success: "Lecture addedd successfully",
            error: "Failed to add the lecture"
        });
        return (response).data
    } catch (error) {
        toast.error(error?.response?.data?.error)
    }
})

export const deleteLecture = createAsyncThunk('/course/lecture/delete', async (data) => {
    try {
        const response = await axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`)
        toast.promise(response, {
            loading: "Wait... Deleting cource lecture",
            success: "Lecture deleted successfully",
            error: "Failed to delete the lecture"
        });
        return (response).data
    } catch (error) {
        toast.error(error?.response?.data?.error)
    }
})


const lectureSlice = createSlice({
    name: 'lecture',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCourceLecture.fulfilled, (state, action) => {
                console.log(action);
                state.lectures = action?.payload?.lectures;
            })
            .addCase(addCourseLecture.fulfilled, (state, action) => {
                console.log(action);
                state.lectures = action?.payload?.course?.lectures;
            })
    }
})



export default lectureSlice.reducer