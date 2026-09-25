"use client";
import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {

  return (
    <section className='relative w-full'>
      <div className='hero pt-12  relative z-10 w-full flex flex-col  items-center justify-center relative overflow-hidden'>

        <div className="w-[50%] pt-44 relative overflow-hidden bg-[#F3EBE9]  text-[#3A3024] rounded-t-full">

          <div className="absolute z-[100] inset-0 rounded-t-full border-2 border-[#3A3024] z-10 pointer-events-none"></div>
          <div className="absolute z-[100] inset-[1.25rem] md:inset-[1.25rem] rounded-t-full border-4 border-dotted border-[#3A3024] z-10 pointer-events-none"></div>
          <div className="absolute z-[100] inset-[1.5rem] md:inset-[2.5rem] rounded-t-full border-2 border-[#3A3024] z-10 pointer-events-none"></div>

          <img className="cover absolute opacity-50  inset-0" src="/images/paper.avif" alt="" />

          <div className='flex w-full  flex-col items-center justify-center gap-y-24 px-4 uppercase text-center text-sm relative z-10'>
            {/* Top Text */}

              <img className='w-44 drop-shadow-xl ' src="/images/logo.svg" alt="" />

            <div className=''>
              <p>Mr. and Mrs. Josh Spiegel</p>
              <p>Mr. and Mrs. Elliot Gluck</p>
              <p>Request the honor of your presence</p>
              <p>at the marriage of their children</p>
            </div>
            {/* Names */}
            <div className=' leading-[8rem] text-center text-4xl md:text-[10rem] normal-case '>
              <p className='calli -translate-x-20'>
                Adina
              </p>
              <p className='uppercase text-sm'>
                and
              </p>
              <p className='calli translate-x-20'>
                Akiva
              </p>
            </div>
          </div>
          <div className="flex z-10 relative flex-col items-center text-center py-44 w-full space-y-12 ">

            {/* Save the Date */}
            <div className="flex flex-col items-center space-y-4 md:space-y-5">
              <p className="uppercase text-3xl ">
                Sunday, 8<sup className='lowercase'>th</sup> Nov, 2026
              </p>
              <p className="uppercase text-sm">
                At five o'clock in the evening
              </p>
            </div>

            {/* Decorative Divider */}
            <div className="w-12 h-px bg-[#3A3024]/20"></div>

            {/* Venue */}
            <div className="flex flex-col items-center space-y-4 md:space-y-5">
              <p className='uppercase  opacity-80 text-sm mb-2'>Venue</p>
              <div className="">

                <p className=" text-3xl  uppercase">
                  The Duggal Greenhouse
                </p>
                <p className=" text-3xl uppercase">
                  Brooklyn, New York
                </p>
              </div>
            </div>

            {/* Decorative Divider */}
            <div className="w-12 h-px bg-[#3A3024]/20"></div>

            {/* Dress code */}
            <div className="flex flex-col items-center space-y-4 md:space-y-5">
              <p className='uppercase  opacity-80 text-sm mb-2'>Dress code</p>
              <div className="">

                <p className="uppercase text-3xl">
                  Black Tie
                </p>
                <p className="uppercase text-3xl ">
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