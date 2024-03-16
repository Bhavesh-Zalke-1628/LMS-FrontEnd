import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast"
const initialState = {
    email: []
}

export const sendEmail = createAsyncThunk('/send/email', async (data) => {
    const res = await axiosInstance.post('/auth/reset')
    toast.promise(res, {
        loading: "Sending email",
        success: (data) => {
            res.data
        },
        error: "Failed to send email"
    }
    )
    return await res.data
})

export const changePassword = createAsyncThunk("/changepassword", async (data) => {
    const config = {
        'content-Type': 'application/json'
    }
    console.log(data)
    try {
        const res = await axiosInstance.post('/auth/change-password', data)
        console.log(res.data)
        toast.promise(res, {
            loading: "change the password",
            success: (data) => {
                console.log(data)
                return data?.data?.msg;
            },
            error: "Failed to changed the password"
        })
        console.log(res)
        return res.data

    } catch (error) {
        toast.error(error?.response?.data);
    }
})


const passwordSlice = createSlice({
    name: 'changePassword',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    }
})



export default passwordSlice.reducer