import { useEffect } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from '../../Layouts/HomeLayout';
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice";

function Checkout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpay_payment_id = useSelector((state) => state?.razorpay?.key);
    console.log(razorpay_payment_id)
    const razorpay_subscription_id = useSelector(async (state) => await state?.razorpay?.subscription_id);
    console.log(razorpay_subscription_id)
    const isPaymentVerified = useSelector((state) => state?.razorpay?.isPaymentVerified);
    console.log(isPaymentVerified)
    const userData = useSelector((state) => state?.auth?.data);
    console.log(userData)
    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: ""
    }

    async function handleSubscription(e) {
        e.preventDefault();
        if (!razorpay_payment_id || !razorpay_subscription_id) {
            toast.error("Something went wrong");
            return;
        }
        const options = {
            key: razorpay_payment_id,
            razorpay_subscription_id: razorpay_subscription_id,
            name: "e-Shiksah Pvt. Ltd.",
            description: "Subscription",
            theme: {
                color: '#F37253'
            },
            handler: async (response) => {
                console.log(response.ra)
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;

                console.log("response >", paymentDetails.razorpay_payment_id, paymentDetails.razorpay_subscription_id, paymentDetails.razorpay_signature)
                toast.success("Payment successfull");

                const res = dispatch(verifyUserPayment(paymentDetails));
                console.log('res >>>>>>>', res)
                res?.payload?.success ? navigate("/checkout/success") : navigate("/checkout/fail");
            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    async function load() {
        dispatch(getRazorPayId());
        dispatch(purchaseCourseBundle());
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <HomeLayout>
            <form
                onSubmit={handleSubscription}
                className="min-h-[90vh] flex items-center justify-center text-white"
            >
                <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl0lg rounded-tr-lg">Subscription Bundle</h1>
                    <div className="px-4 space-y-5 text-center">
                        <p className="text-[17px]">
                            This purchase will allow you to access all available course
                            of our platform for {" "}
                            <span className="text-yellow-500 font-bold">
                                <br />
                                1 Year duration
                            </span> {" "}
                            All the existing and new launched courses will be also available
                        </p>

                        <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                            <BiRupee /><span>499</span> only
                        </p>
                        <div className="text-gray-200">
                            <p>100% refund on cancellation</p>
                            <p>* Terms and conditions applied *</p>
                        </div>
                        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2">
                            Buy now
                        </button>
                    </div>
                </div>

            </form>
        </HomeLayout>
    );

}

export default Checkout;