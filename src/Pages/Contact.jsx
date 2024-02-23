import React, { useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import toast from 'react-hot-toast';
import { isEmail } from '../Helpers/regexMatcher';
import axios from 'axios';
import axiosInstance from '../Helpers/axiosInstance';

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  })

  function handleInputChange(e) {
    const { name, value } = e.target;
    console.log(name, value)
    setUserInput({
      ...userInput,
      [name]: value
    })
  }


  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are required")
      return
    }

    if (!isEmail(userInput.email)) {
      return toast.error("Invalid Email")
    }

    try {
      const response = axiosInstance.post('/contact', userInput)
      toast.promise(response, {
        loading: "Submitting your message",
        success: "form Submittted successfully",
        error: "Form submition failed"
      });

      const contactResponse = await response;
      if (contactResponse?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        })
      }
    } catch (error) {
      toast.error("Operation Failed")
    }
  }
  return (
    <HomeLayout>
      <div className=' flex items-center justify-center h-[90vh]'>
        <form
          noValidate
          onSubmit={onFormSubmit}
          className=' flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]'>
          <h1 className=' text-3xl font-semibold'>
            Contact Form
          </h1>
          <div className=' flex flex-col w-full gap-1'>
            <label htmlFor='name' className=' text-lg font-semibold capitalize'>
              name
            </label>
            <input
              type='text'
              className=' bg-transparent border px-2 py-1'
              id='name'
              name='name'
              placeholder='Enter your name'
              onChange={handleInputChange}
              value={userInput.name}
            />
          </div>

          <div className=' flex flex-col w-full gap-1'>
            <label htmlFor='email' className=' text-lg font-semibold capitalize'>
              email
            </label>
            <input
              type='text'
              className=' bg-transparent border px-2 py-1'
              id='email'
              name='email'
              placeholder='Enter your email'
              onChange={handleInputChange}
              value={userInput.email}
            />
          </div>


          <div className=' flex flex-col w-full gap-1'>
            <label htmlFor='message' className=' text-lg font-semibold capitalize'>
              Message
            </label>
            <textarea
              type='text'
              className=' bg-transparent border px-2 py-1 resize-none h-40'
              id='message'
              name='message'
              placeholder='Enter your Message'
              onChange={handleInputChange}
              value={userInput.message}
            />
          </div>
          <button
            type='submit'
            className=' w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-xl rounded-md'
          >Submit</button>
        </form>
      </div>
    </HomeLayout>
  )
}

export default Contact
