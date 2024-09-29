import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import axiosInstance from '../../Helpers/axiosInstance.js'
import toast from "react-hot-toast"
const initialState = {
    Comment: ""
}



export const addComment = createAsyncThunk('/add/comment', async (data) => {

    const response = await axios.post(`http://localhost:5000/api/cource/${data[0][0]}/comment/${data[0][1]}`, data[1])
    console.log(response.data.cource.lectures)
    toast.promise(response, {
        loading: "Adding commnet",
        success: "Comment add successfully",
        error: "Failed to add comment"
    }
    )
    return (await response).data.cource.lectures;
})


const commnetSlice = createSlice({
    name: "Comment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addComment.fulfilled, (state, action) => {
                console.log(state.action)
                state.Comment = action.payload
            })
    }
})


export default commnetSlice.reducer