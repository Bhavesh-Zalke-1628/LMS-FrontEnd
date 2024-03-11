import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    email: []
}


const passwordSlice = createSlice({
    name: 'changePassword',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})



export default passwordSlice.reducer