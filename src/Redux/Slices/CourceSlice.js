import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";
import { json } from "react-router-dom";
const initialState = {
    courseData: [],
    numberOfCourses: localStorage.getItem('numberOfCourses')
}
export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const response = axiosInstance.get("/cource");
        toast.promise(response, {
            loading: "loading course data...",
            success: "Courses loaded successfully",
            error: "Failed to get the courses",
        });
        return (await response).data.cources;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const deleteCorce = createAsyncThunk("/course/delete", async (id) => {
    try {
        const response = await axiosInstance.delete(`/cource/${id}`);
        console.log(response)
        toast.promise(response, {
            loading: " deleting course...",
            success: "Courses deleted successfully",
            error: "Failed to delete courses",
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const creatNewCourse = createAsyncThunk('/course/create', async (data) => {
    try {
        let formData = new FormData();
        formData.append('title', data?.title)
        formData.append('description', data?.description)
        formData.append('categeory', data?.categeory)
        formData.append('createdBy', data?.createdBy)
        formData.append('thumbnails', data?.thumbnails)
        const response = axiosInstance.post('/cource', formData);
        toast.promise(response, {
            loading: "Crating new Cource",
            success: "Cource Created Successfully",
            error: "Failed to create Cource"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCourses.fulfilled, (state, action) => {
                console.log("number of courses", action.payload.length)
                if (action.payload) {
                    state.numberOfCourses = action?.payload?.length
                    state.courseData = [...action.payload];
                }
            })
    }
});

export default courseSlice.reducer;