"use client";
import React, { useState, useEffect } from 'react'
import { RiCloseLine, RiCheckLine } from '@remixicon/react'

const Contact = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [step, setStep] = useState('initial'); // 'initial', 'form', 'success'

    useEffect(() => {
        if (isRendered) {
            document.body.style.overflow = 'hidden';
            if (window.lenis) window.lenis.stop();
        } else {
            document.body.style.overflow = '';
            if (window.lenis) window.lenis.start();
        }

        return () => {
            document.body.style.overflow = '';
            if (window.lenis) window.lenis.start();
        };
    }, [isRendered]);

    const handleOpen = () => {
        setIsRendered(true);
        setStep('initial');
        // Slight delay to allow DOM to render before triggering CSS transition
        setTimeout(() => setIsVisible(true), 10);
    };

    const handleClose = () => {
        setIsVisible(false);
        // Wait for CSS transition to finish before unmounting
        setTimeout(() => setIsRendered(false), 300);
    };

    const handleYes = () => {
        setStep('form');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep('success');
    };

    return (
        <div className='w-full   z-100 text-[#3A3024] py-44 px-6 flex flex-col md:flex-row items-start justify-center gap-12 md:gap-0 relative'>

            <div className="center flex-col w-full md:w-1/2 text-center px-4">
                <div className="bg-[#F3EBE9] relative p-36 z-10">
                    <div className="absolute z-[100] inset-0  border-2 border-[#3A3024] z-10 pointer-events-none"></div>
                    <div className="absolute z-[100] inset-[1.25rem] md:inset-[1.25rem]  border-4 border-dotted border-[#3A3024] z-10 pointer-events-none"></div>
                    <div className="absolute z-[100] inset-[1.5rem] md:inset-[2.5rem]  border-2 border-[#3A3024] z-10 pointer-events-none"></div>

                    <img className="cover absolute z-[-1] opacity-50  inset-0" src="/images/paper.avif" alt="" />
                    <p className='uppercase text-sm mb-6 '>
                        Your presence is our greatest gift. <br /> Should you wish to honor us with <br /> one, we are registered below.
                    </p>
                    <a target='_blank' rel="noreferrer" href="https://registryfinder.com/registry/akiva-gluck/adina-spiegel/wedding/november-2026/new-york/7092530">
                        <button className='bg-[#3A3024] px-8 py-3 font-medium text-xs border border-transparent hover:border-[#3A3024] hover:text-[#3A3024] hover:bg-transparent transition-all duration-300 uppercase text-[#EDE3D5]'>Gift Registry</button>
                    </a>
                </div>
            </div>


            <div className="center flex-col w-full md:w-1/2 text-center px-4">
                <div className="bg-[#F3EBE9] relative p-36 z-10">
                    <div className="absolute z-[100] inset-0  border-2 border-[#3A3024] z-10 pointer-events-none"></div>
                    <div className="absolute z-[100] inset-[1.25rem] md:inset-[1.25rem]  border-4 border-dotted border-[#3A3024] z-10 pointer-events-none"></div>
                    <div className="absolute z-[100] inset-[1.5rem] md:inset-[2.5rem]  border-2 border-[#3A3024] z-10 pointer-events-none"></div>

                    <img className="cover absolute z-[-1] opacity-50  inset-0" src="/images/paper.avif" alt="" />

                    <p className='uppercase text-sm mb-6 '>
                        We can't wait to celebrate!  <br />Please fill out the form below <br /> to RSVP.
                    </p>
                    <button onClick={handleOpen} className='bg-[#3A3024] px-8 py-3 font-medium text-xs border border-transparent hover:border-[#3A3024] hover:text-[#3A3024] hover:bg-transparent transition-all duration-300 uppercase text-[#EDE3D5]'>RSVP</button>
                </div>
            </div>

            {/* RSVP Modal Backdrop */}
            {isRendered && (
                <div onClick={handleClose} className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-300 ease-in-out ${isVisible ? 'bg-black/40 backdrop-blur-sm opacity-100' : 'bg-transparent backdrop-blur-none opacity-0 pointer-events-none'}`}>

                    {/* Modal Card */}
                    <div onClick={(e) => e.stopPropagation()} className={`bg-[#3A3024] text-[#EDE3D5] p-8  w-full max-w-md relative flex flex-col items-center text-center shadow-2xl transition-all duration-300 ease-out transform ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}`}>

                        {/* Step 1: Initial Question */}
                        {step === 'initial' && (
                            <div className="w-full animate-scale-in space-y-16">
                                <div className="space-y-4 mt-4">
                                    <h3 className="text-4xl uppercase">Are you coming?</h3>
                                    <p className="text-sm uppercase  opacity-80 px-4">
                                        We would be absolutely thrilled to have you join us for our special day. Please let us know if you can make it!
                                    </p>
                                </div>
                                <div className="flex gap-4 w-full">
                                    <button onClick={handleYes} className="flex-1 bg-transparent border border-[#EDE3D5] text-[#EDE3D5] py-3 uppercase font-medium text-sm hover:bg-[#EDE3D5] hover:text-[#3A3024] transition-all ">Yes</button>
                                    <button onClick={handleClose} className="flex-1 bg-transparent border border-[#EDE3D5] text-[#EDE3D5] py-3 uppercase font-medium text-sm hover:bg-[#EDE3D5] hover:text-[#3A3024] transition-all ">No</button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Form */}
                        {step === 'form' && (
                            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center animate-scale-in">
                                <h3 className="text-4xl uppercase mb-12">Join the Celebration</h3>

                                <div className="w-full space-y-6 text-left">
                                    <input required type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-[#EDE3D5]/40  py-2 text-[#EDE3D5] placeholder:text-[#EDE3D5]/60 focus:outline-none focus:border-[#EDE3D5] transition-colors" />
                                    <input required type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-[#EDE3D5]/40  py-2 text-[#EDE3D5] placeholder:text-[#EDE3D5]/60 focus:outline-none focus:border-[#EDE3D5] transition-colors" />
                                    <input required type="tel" placeholder="Contact Number" className="w-full bg-transparent border-b border-[#EDE3D5]/40  py-2 text-[#EDE3D5] placeholder:text-[#EDE3D5]/60 focus:outline-none focus:border-[#EDE3D5] transition-colors" />
                                    <input required type="text" min="1" placeholder="Number of Guests" className="w-full bg-transparent border-b border-[#EDE3D5]/40  py-2 text-[#EDE3D5] placeholder:text-[#EDE3D5]/60 focus:outline-none focus:border-[#EDE3D5] transition-colors" />
                                </div>

                                <button type="submit" className="mt-10 w-full bg-[#EDE3D5] text-[#3A3024] py-3 uppercase  text-sm border border-transparent hover:bg-transparent hover:border-[#EDE3D5] hover:text-[#EDE3D5] font-medium transition-all ">Submit</button>
                            </form>
                        )}

                        {/* Step 3: Success */}
                        {step === 'success' && (
                            <div className="flex flex-col items-center py-6 animate-scale-in">
                                <div className="w-16 h-16 rounded-full border-2 border-[#EDE3D5] flex items-center justify-center mb-6 text-[#EDE3D5]">
                                    <RiCheckLine size={32} />
                                </div>
                                <h3 className="text-2xl md:text-3xl uppercase tracking-widest mb-4">Thank You!</h3>
                                <p className="text-xs opacity-80 uppercase tracking-widest leading-relaxed">Thanks for your booking. <br /> We can't wait to see you.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Contact