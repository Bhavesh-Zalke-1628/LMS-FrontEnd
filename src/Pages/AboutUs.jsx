import React from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import aboutMainImage from '../Assets/Images/aboutMainImage.png'
import { celebrities } from '../Component/Contants/CeleratyData.js'
import CarouselSlide from '../Component/CarouselSlide.jsx'
function AboutUs() {
    return (
        <HomeLayout>
            <div className=' pl-20 pt-20 flex flex-col text-white'>
                <div className=' flex items-center gap-5 px-10'>
                    <section className=' w-1/2 scroll-py-10'>
                        <h1 className=' text-5xl text-yellow-500 font-semibold'>Afordable and Quality Education</h1>
                        <p className=' text-xl text-gray-200'>
                            Our goal is to provide afordable and the Quality education to the world,
                            We are providing the platform form for the aspiring teacher and students to share their skiils , creativity and knowledge to each other
                            to empawer and contribute in the growth and wellness of mankind.
                        </p>
                    </section>
                    <div className=' w-1/2'>
                        <img
                            id='test1'
                            style={{
                                filter: 'drop-shadow(0px 10px rgb(0,0,0))'
                            }}
                            className=' drop-shadow-2xl'
                            src={aboutMainImage}
                            alt="AboutUs img" />
                    </div>
                </div>

                <div className="carousel w-1/2 my-16 m-auto">

                    {celebrities && celebrities.map(celebrity => (<CarouselSlide
                        {...celebrity}
                        key={celebrity.slideNumber}
                        totalSlides={celebrities.length}

                    />))}

                </div>
            </div>
        </HomeLayout>
    )
}

export default AboutUs
