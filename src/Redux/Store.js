import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Slices/AuthSlice.js';
import CourceSlice from './Slices/CourceSlice.js';
import RazorpaySlice from './Slices/RazorpaySlice.js';
import LectureSlice from './Slices/LectureSlice.js';
const store = configureStore({
    reducer: {
        auth: authSlice,
        courses: CourceSlice,
        razorpay: RazorpaySlice,
        lecture: LectureSlice
    },
    devTools: true
});

export default store;