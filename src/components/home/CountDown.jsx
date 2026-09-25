"use client";
import React, { useState, useEffect } from 'react'

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    status: 'loading' // loading, counting, live, ended
  });

  useEffect(() => {
    // Target date: Sunday, Nov 8, 2026 at 17:00 (5:00 PM)
    const targetDate = new Date('2026-11-08T17:00:00').getTime();
    // End date: 24 hours after target date
    const endDate = targetDate + 24 * 60 * 60 * 1000;

    const updateCountdown = () => {
      const now = new Date().getTime();

      if (now >= endDate) {
        setTimeLeft(prev => ({ ...prev, status: 'ended' }));
        return;
      }

      if (now >= targetDate && now < endDate) {
        setTimeLeft(prev => ({ ...prev, status: 'live' }));
        return;
      }

      const difference = targetDate - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, status: 'counting' });
    };

    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);


  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center w-16 sm:w-24 md:w-32 lg:w-40">
      <span
        className="text-4xl sm:text-6xl md:text-7xl lg:text-[7rem]  leading-none"
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-sm uppercase  mt-3 md:mt-6">
        {label}
      </span>
    </div>
  );

  const Separator = () => (
    <div className="flex flex-col items-center justify-start h-full">
      <span
        className="text-3xl sm:text-5xl md:text-6xl lg:text-[6rem]  leading-none mt-1 sm:mt-2 md:mt-3 mx-1 sm:mx-2 md:mx-4"
      >
        :
      </span>
    </div>
  );

  return (
    <section className=' relative z-10 text-[#3A3024] pt-44 flex flex-col items-center justify-center min-h-[40vh]'>

      <div className="relative bg-[#F3EBE9] z-100 p-36">
        <img className="cover absolute z-[-1] opacity-50  inset-0" src="/images/paper.avif" alt="" />

        <div className="absolute z-[100] inset-0 border-2 border-[#3A3024] z-10 pointer-events-none"></div>
        <div className="absolute z-[100] inset-[1.25rem] md:inset-[1.25rem] border-4 border-dotted border-[#3A3024] z-10 pointer-events-none"></div>
        <div className="absolute z-[100] inset-[1.5rem] md:inset-[2.5rem] border-2 border-[#3A3024] z-10 pointer-events-none"></div>


        {timeLeft.status === 'loading' && (
          <div className="opacity-0">Loading...</div>
        )}

        {timeLeft.status === 'ended' && (
          <h2
            className="text-3xl md:text-5xl uppercase  text-center"
          >
            Event has ended
          </h2>
        )}

        {timeLeft.status === 'live' && (
          <h2
            className="text-3xl md:text-5xl uppercase  text-center"
          >
            Event is live
          </h2>
        )}

        {timeLeft.status === 'counting' && (
          <div className="">
            <p className='uppercase text-sm text-center'>Our Forever begins in</p>
            <div className="flex items-start justify-center">
              <TimeUnit value={timeLeft.days} label="Days" />
              <Separator />
              <TimeUnit value={timeLeft.hours} label="Hours" />
              <Separator />
              <TimeUnit value={timeLeft.minutes} label="Minutes" />
              <Separator />
              <TimeUnit value={timeLeft.seconds} label="Seconds" />
            </div>
          </div>
        )}
      </div>

    </section>
  )
}

export default CountDown