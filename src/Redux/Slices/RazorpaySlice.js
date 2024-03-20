
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../Helpers/axiosInstance"
import axios from "axios"

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: [],
    status: ""
}

export const getRazorPayId = createAsyncThunk("/razorpay/getId", async () => {
    try {
        const response = await axiosInstance.get('/payment/razorpay-key/getid');
        return response.data;
    } catch (error) {
        toast.error("Failed to load data");
    }
})


export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async () => {
    try {
        const response = await axiosInstance.post('/payment/razorpay/subscribe');
        console.log(response.data)
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});


export const verifyUserPayment = createAsyncThunk("/payments/verify", async (data) => {
    try {
        const response = await axiosInstance.post('/payment/razorpay/verify', {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        });
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});


export const getPaymentRecord = createAsyncThunk(
    '/payments/record',
    async () => {
        try {
            console.log("Get payment record");
            const response = await axios.get('http://localhost:5000/api/payment?count=100');
            console.log(response);
            toast.promise(response, {
                loading: "Getting the payment records",
                success: (data) => {
                    return data?.data?.msg;
                },
                error: "Failed to get payment records"
            });
            console.log(response.data.payments);
            return response.data;
        } catch (error) {
            console.error("Error occurred while fetching payment records: ", error);
            throw error; // Make sure to throw the error to properly handle it in the Redux slice or component
        }
    }
);


export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async () => {
    try {
        const response = axiosInstance.post("/payment/unsubscribe");
        toast.promise(response, {
            loading: "unsubscribing the bundle",
            success: (data) => {
                return data?.data?.msg
            },
            error: "Failed to ubsubscribe"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }
});
const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRazorPayId.fulfilled, (state, action) => {
                state.key = action?.payload?.key;
            })
            .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
                console.log('action in  verifyUserPayment full >', action)
                // console.log(action?.payload)
                toast.success(action?.payload.msg)
                state.subscription_id = action?.payload?.subscription_id;
            })
            .addCase(verifyUserPayment.rejected, (state, action) => {
                console.log('action in  verifyUserPayment rejected >', action)
                toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success;
            })

            .addCase(verifyUserPayment.fulfilled, (state, action) => {
                toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success;
                state.status = action?.asubscription?.status
            })
            .addCase(getPaymentRecord.fulfilled, (state, action) => {
                console.log(action.payload)
                state.allPayments = action?.payload?.allPayments;
                state.finalMonths = action?.payload?.finalMonths;
                state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
            })
    }
});

export default razorpaySlice.reducer;