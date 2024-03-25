import React from "react";

const Preloader = () => {
    return (
        <div className=" h-full w-full flex flex-col items-center justify-center bg-gray-900">
            <div className='flex space-x-3 justify-center items-center '>
                <div className='h-8 w-8 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='h-8 w-8 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='h-8 w-8 bg-yellow-400 rounded-full animate-bounce'></div>

            </div>
            <div className=" text-white w-fit">
                <p className=" text-xl font-semibold italic">
                    Wait !!!!
                </p>
            </div>
        </div >

    );
};

export default Preloader;
