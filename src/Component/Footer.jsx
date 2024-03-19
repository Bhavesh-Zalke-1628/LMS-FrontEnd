import React from 'react'
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'
import TypewriterComponent from 'typewriter-effect';

function Footer() {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    return (
        <>
            <footer className='relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-20'>
                <section className=' text-lg '>
                    <TypewriterComponent
                        options={{
                            strings: [`copyright ${year} | All rights  reserved`],

                            loop: true,
                            autoStart: true,
                            delay: 200,
                            deleteSpeed: 50,
                            pauseFor: 2000,
                            cursor: "➡️"
                        }}
                    />

                </section>
                <section className='flex items-center justify-center gap-5 text-2xl text-white'>
                    <a
                        href="https://www.linkedin.com/in/vaishnavi-gawali-9a8385260/"
                        className=' hover:text-yellow-500 transition-all ease-in-out duration-300'>
                        <BsLinkedin />
                    </a>
                    <a
                        href="https://github.com/VaishnaviGawali28"
                        className=' hover:text-yellow-500 transition-all ease-in-out duration-300'>
                        <BsGithub />
                    </a>
                    <a
                        href="https://www.instagram.com/vaishnavigawali614/"
                        className=' hover:text-yellow-500 transition-all ease-in-out duration-300'>
                        <BsInstagram />
                    </a>
                    <a
                        href=""
                        className=' hover:text-yellow-500 transition-all ease-in-out duration-300'>
                        <BsTwitter />
                    </a>
                </section>
            </footer>
        </>
    )
}

export default Footer
