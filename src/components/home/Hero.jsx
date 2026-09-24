"use client";
import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // Parallax for the background video (moves slower)
    gsap.to(videoRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: containerRef });

  return (
    <>
      <section ref={containerRef} className='hero h-screen w-full flex flex-col text-[#EDE3D5] bg-[#3A3024] items-center justify-center relative overflow-hidden'>
        
        {/* We make the video container slightly taller than 100% so we have room to pan it without seeing edges */}
        <div ref={videoRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <video className='w-full h-full object-cover brightness-50' loop autoPlay muted playsInline src="/videos/hero.mp4"></video>
        </div>
        
        <div ref={textRef} className='flex flex-col items-center justify-center px-4 uppercase text-center text-sm relative z-10'>
          {/* Top Text */}
          <div className='absolute  -translate-y-28'>
            <p>Mr. and Mrs. Josh Spiegel</p>
            <p>Mr. and Mrs. Elliot Gluck</p>
            <p>Request the honor of your presence</p>
            <p>at the marriage of their children</p>
          </div>

          {/* Names */}
          <div className=' leading-none text-center text-4xl md:text-8xl uppercase '>
            <h1 className=''>
              Adina
              and
              Akiva
            </h1>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero