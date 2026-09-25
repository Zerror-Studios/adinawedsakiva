"use client";
import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {

  return (
    <section className='relative w-full'>
      <h1 className='fixed opacity-0 pointer-events-none'>Adina and akiva wedding site</h1>
      <div className='hero pt-24 md:pt-12  relative z-10 w-full flex flex-col  items-center justify-center relative overflow-hidden'>

        <div className=" w-[calc(100%-2rem)] md:w-[65%] pt-18 relative overflow-hidden    text-[#3A3024] rounded-t-full">

          <div className="absolute z-[100] inset-0 rounded-t-full border-2 border-[#3A3024] z-10 pointer-events-none"></div>
          <div className="absolute z-[100] inset-[0.75rem] md:inset-[1.25rem] rounded-t-full border-4 border-dotted border-[#3A3024] z-10 pointer-events-none"></div>
          <div className="absolute z-[100] inset-[1.5rem] md:inset-[2.5rem] rounded-t-full border-2 border-[#3A3024] z-10 pointer-events-none"></div>

          <Image fill className="cover  inset-0" src="/images/paper_bg.png" alt="" />

          <div className='flex w-full  flex-col items-center justify-center gap-y-12 px-4 uppercase text-center text-sm relative z-10'>

            <Image width={240} height={240} className=' w-32 md:w-60 h-auto' src="/images/logo.png" alt="" />

            <div className=''>
              <p>Mr. and Mrs. Josh Spiegel</p>
              <p>Mr. and Mrs. Elliot Gluck</p>
              <p>Request the honor of your presence</p>
              <p>at the marriage of their children</p>
            </div>
            <Image width={480} height={480} className=' w-[20rem] md:w-[30rem] h-auto' src="/images/names.svg" alt="" />
          </div>
          <div className="flex z-10 relative flex-col items-center text-center py-32 w-full space-y-12 ">

            <div className="flex flex-col items-center space-y-4 md:space-y-5">
              <p className="uppercase text-xl md:text-2xl ">
                Sunday, 8<sup className='lowercase'>th</sup> Nov, 2026
              </p>
              <p className="uppercase text-sm">
                At five o'clock in the evening
              </p>
            </div>

            <div className="w-12 h-px bg-[#3A3024]/20"></div>

            <div className="flex flex-col items-center space-y-4 md:space-y-5">
              <p className='uppercase  opacity-80 text-sm mb-2'>Venue</p>
              <div className="">

                <p className=" text-xl md:text-2xl  uppercase">
                  The Duggal Greenhouse
                </p>
                <p className=" text-xl md:text-2xl uppercase">
                  Brooklyn, New York
                </p>
              </div>
            </div>

            <div className="w-12 h-px bg-[#3A3024]/20"></div>

            <div className="flex flex-col items-center space-y-4 md:space-y-5">
              <p className='uppercase  opacity-80 text-sm mb-2'>Dress code</p>
              <div className="">

                <p className="uppercase text-xl md:text-2xl">
                  Black Tie
                </p>
                <p className="uppercase text-xl md:text-2xl ">
                  Modest Dress Requested
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero