import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    allUserCount: 0,
    subscribedUser: 0
}

export const getStatData = createAsyncThunk('/stat/get', async () => {
    try {
        const response = await axiosInstance.get('/admin/stat/user');
        toast.promise(response, {
            loading: "Getting the statt",
            success: (data) => {
                return data?.data?.msg
            },
            error: 'Failed to load data'
        })
        return await response.data
    } catch (error) {
        toast.error(error?.response?.data?.msg)
    }
})

const StatSlice = createSlice({
    name: 'stat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStatData.fulfilled, (state, action) =>{
                state.allUserCount = action?.payload?.allUserCount
                state.subscribedUser =action?.payload
            })
    }
})



export default StatSlice.reducer