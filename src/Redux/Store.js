import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Slices/AuthSlice.js';
import CourceSlice from './Slices/CourceSlice.js';
import RazorpaySlice from './Slices/RazorpaySlice.js';
const store = configureStore({
    reducer: {
        auth: authSlice,
        courses: CourceSlice,
        razorpay: RazorpaySlice
    },
    devTools: true
});

export default store;