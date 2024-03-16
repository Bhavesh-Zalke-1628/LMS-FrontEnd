import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from '../../Helpers/axiosInstance.js'
import { json } from "react-router-dom";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem('data')) || {}
}



export const createAccount = createAsyncThunk("/signup", async (data) => {
    try {
        const res = axiosInstance.post("/auth/register", data);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                console.log(data)
                return data?.data?.msg;
            },
            error: "Failed to create account"
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const login = createAsyncThunk("/login", async (data) => {
    try {
        console.log(data)
        const res = axiosInstance.post("/auth/login", data);
        toast.promise(res, {
            loading: "Wait! Authentication in process",
            success: (data) => {
                return data?.data?.msg;
            },
            error: "Failed to login"
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data);
    }
})


export const logout = createAsyncThunk("/logout", async () => {
    try {
        const res = axiosInstance.get('/auth/logout')
        toast.promise(res, {
            loading: "Wait! Logging out",
            success: (data) => {
                return data?.data?.msg;
            },
            error: 'failed to logout'
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})


export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
    console.log(data[1])
    try {
        const res = axiosInstance.put(`/auth/update/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Wait! Update profile in progress",
            success: (data) => {
                return data;
            },
            error: 'failed update a profile'
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }
})



export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
        const res = axiosInstance.get("/auth/me")
        console.log(res)
        return (await res).data;
    } catch (error) {
        toast.error(error.message);
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem('data', JSON.stringify(action?.payload?.user))
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('role', action?.payload?.user?.role);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear()
                state.data = {};
                state.isLoggedIn = false
                state.role = "";
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                if (!action?.payload?.user) return;
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", action?.payload?.user?.role);
                state.isLoggedIn = true;
                console.log(action?.payload?.user)
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
            });
    }
})

// export const { } = authSlice.actions;
export default authSlice.reducer;