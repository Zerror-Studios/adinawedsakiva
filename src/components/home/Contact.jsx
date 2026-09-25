"use client";
import React, { useState, useEffect } from 'react'
import { RiCloseLine, RiCheckLine } from '@remixicon/react'
import Image from 'next/image';

const Contact = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [step, setStep] = useState('initial');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        numberOfGuests: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setTimeout(() => setIsVisible(true), 10);
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => setIsRendered(false), 300);
    };

    const handleYes = () => {
        setStep('form');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'contactNumber' && value !== '' && !/^\d+$/.test(value)) {
            return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email Address is required';
        if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact Number is required';
        if (!formData.numberOfGuests) newErrors.numberOfGuests = 'Number of Guests is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setStep('success');
                setFormData({ fullName: '', email: '', contactNumber: '', numberOfGuests: '' });
            } else {
                console.error("Failed to submit form");
                setStep('error');
            }
        } catch (error) {
            console.error("Error:", error);
            setStep('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="fixed z-10 top-4 left-4">
                <a target='_blank' rel="noreferrer" href="https://registryfinder.com/registry/akiva-gluck/adina-spiegel/wedding/november-2026/new-york/7092530">
                    <button className='bg-[#3A3024] px-8 py-3 font-medium z-10 relative text-xs border border-transparent hover:border-[#3A3024] hover:text-[#3A3024] hover:bg-transparent transition-all duration-300 uppercase text-[#F3EBE9]'>Gift Registry</button>
                </a>
            </div>
            <div className="fixed z-10 top-4 right-4">
                <button onClick={handleOpen} className=' bg-[#3A3024] px-8 py-3 font-medium z-10 relative text-xs border border-transparent hover:border-[#3A3024] hover:text-[#3A3024] hover:bg-transparent transition-all duration-300 uppercase text-[#F3EBE9]'>RSVP</button>
            </div>
            <div className='w-full   z-100 text-[#3A3024] py-32 md:py-44 center  relative'>

                <div className="w-[calc(100%-2rem)] md:w-[65%] grid grid-cols-1 md:grid-cols-2 gap-10">

                    <div className="  py-36 text-center center flex-col relative  z-10">
                        <div className="absolute z-[100] inset-0  border-2 border-[#3A3024] z-10 pointer-events-none"></div>
                        <div className="absolute z-[100] inset-[0.75rem] md:inset-[1.25rem]  border-4 border-dotted border-[#3A3024] z-10 pointer-events-none"></div>
                        <div className="absolute z-[100] inset-[1.5rem] md:inset-[2.5rem]  border-2 border-[#3A3024] z-10 pointer-events-none"></div>
                        <Image fill className="cover absolute z-[-1]   inset-0" src="/images/paper_bg.png" alt="img" />
                        <p className='uppercase font-medium text-sm mb-6 '>
                            Your presence is our greatest gift. <br /> Should you wish to honor us with <br /> one, we are registered below.
                        </p>
                        <a target='_blank' rel="noreferrer" href="https://registryfinder.com/registry/akiva-gluck/adina-spiegel/wedding/november-2026/new-york/7092530">
                            <button className='bg-[#3A3024] px-8 py-3 font-medium text-xs border border-transparent hover:border-[#3A3024] hover:text-[#3A3024] hover:bg-transparent transition-all duration-300 uppercase text-[#F3EBE9]'>Gift Registry</button>
                        </a>
                    </div>


                    <div className="  py-36 text-center center flex-col relative  z-10">
                        <div className="absolute z-[100] inset-0  border-2 border-[#3A3024] z-10 pointer-events-none"></div>
                        <div className="absolute z-[100] inset-[0.75rem] md:inset-[1.25rem]  border-4 border-dotted border-[#3A3024] z-10 pointer-events-none"></div>
                        <div className="absolute z-[100] inset-[1.5rem] md:inset-[2.5rem]  border-2 border-[#3A3024] z-10 pointer-events-none"></div>
                        <Image fill className="cover absolute z-[-1]   inset-0" src="/images/paper_bg.png" alt="img" />

                        <p className='uppercase text-sm mb-6 '>
                            We can't wait to celebrate!  <br />Please fill out the form below <br /> to RSVP.
                        </p>
                        <button onClick={handleOpen} className='bg-[#3A3024] px-8 py-3 font-medium text-xs border border-transparent hover:border-[#3A3024] hover:text-[#3A3024] hover:bg-transparent transition-all duration-300 uppercase text-[#F3EBE9]'>RSVP</button>
                    </div>
                </div>

                {isRendered && (
                    <div onClick={handleClose} className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-300 ease-in-out ${isVisible ? 'bg-black/40 backdrop-blur-sm opacity-100' : 'bg-transparent backdrop-blur-none opacity-0 pointer-events-none'}`}>
                        <div onClick={(e) => e.stopPropagation()} className={`  text-[#3A3024]  p-16  w-full max-w-xl relative flex flex-col items-center text-center shadow-2xl transition-all duration-300 ease-out transform ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}`}>

                            <button onClick={handleClose} className=' absolute -top-8 text-xs font-semibold border-2 border-[#3A3024] uppercase z-10  hover:text-[#F3EBE9] cursor-pointer transition-all hover:bg-[#3A3024] bg-[#F3EBE9] px-2 py-1 right-0'>Close</button>

                            <div className="absolute z-[100] inset-0  border-2 border-[#3A3024] z-10 pointer-events-none"></div>
                            <div className="absolute z-[100] inset-[0.75rem] md:inset-[1.25rem]  border-4 border-dotted border-[#3A3024] z-10 pointer-events-none"></div>
                            <div className="absolute z-[100] inset-[1.5rem] md:inset-[2.5rem]  border-2 border-[#3A3024] z-10 pointer-events-none"></div>

                            <Image fill className="cover absolute z-[-1]   inset-0" src="/images/paper_bg.png" alt="img" />

                            {step === 'initial' && (
                                <div className="w-full animate-scale-in p-0 md:p-8 space-y-16">
                                    <div className="space-y-4 mt-4">
                                        <h3 className=" text-2xl md:text-3xl uppercase">Are you coming?</h3>
                                        <p className="text-sm uppercase  opacity-80 px-4">
                                            We would be absolutely thrilled to have you join us for our special day. Please let us know if you can make it!
                                        </p>
                                    </div>
                                    <div className="flex gap-4 w-full">
                                        <button onClick={handleYes} className="flex-1 bg-transparent border border-[#3A3024] text-[#3A3024] py-3 uppercase font-medium text-sm hover:bg-[#3A3024] hover:text-[#F3EBE9] transition-all ">Yes</button>
                                        <button onClick={handleClose} className="flex-1 bg-transparent border border-[#3A3024] text-[#3A3024] py-3 uppercase font-medium text-sm hover:bg-[#3A3024] hover:text-[#F3EBE9] transition-all ">No</button>
                                    </div>
                                </div>
                            )}

                            {step === 'form' && (
                                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center animate-scale-in p-0 md:p-8">
                                    <h3 className=" text-2xl md:text-3xl uppercase mb-12">Join the Celebration</h3>

                                    <div className="w-full space-y-6 text-left">
                                        <div>
                                            <input name="fullName" value={formData.fullName} onChange={handleChange} required type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-[#3A3024]/40  text-xl text-[#3A3024] placeholder:text-[#3A3024]/60 focus:outline-none focus:border-[#3A3024] transition-colors" />
                                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                        </div>
                                        <div>
                                            <input name="email" value={formData.email} onChange={handleChange} required type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-[#3A3024]/40  text-xl text-[#3A3024] placeholder:text-[#3A3024]/60 focus:outline-none focus:border-[#3A3024] transition-colors" />
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <input name="contactNumber" value={formData.contactNumber} onChange={handleChange} required type="tel" placeholder="Contact Number" className="w-full bg-transparent border-b border-[#3A3024]/40  text-xl text-[#3A3024] placeholder:text-[#3A3024]/60 focus:outline-none focus:border-[#3A3024] transition-colors" />
                                            {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
                                        </div>
                                        <div>
                                            <input name="numberOfGuests" value={formData.numberOfGuests} onChange={handleChange} required type="number" min="1" placeholder="Number of Guests" className="w-full bg-transparent border-b border-[#3A3024]/40  text-xl text-[#3A3024] placeholder:text-[#3A3024]/60 focus:outline-none focus:border-[#3A3024] transition-colors" />
                                            {errors.numberOfGuests && <p className="text-red-500 text-xs mt-1">{errors.numberOfGuests}</p>}
                                        </div>
                                    </div>

                                    <button disabled={isSubmitting} type="submit" className="mt-10 w-full bg-[#3A3024] text-[#F3EBE9] py-3 uppercase  text-sm border border-transparent hover:bg-transparent hover:border-[#3A3024] hover:text-[#3A3024] font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ">{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                                </form>
                            )}

                            {step === 'success' && (
                                <div className="flex flex-col items-center py-6 animate-scale-in p-0 md:p-8">
                                    <div className="w-16 h-16 rounded-full border-2 border-[#3A3024] flex items-center justify-center mb-6 text-[#3A3024]">
                                        <RiCheckLine size={32} />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl uppercase  mb-4">Thank You!</h3>
                                    <p className="text-sm  uppercase  ">Thanks for your booking. <br /> We can't wait to see you.</p>
                                </div>
                            )}

                            {step === 'error' && (
                                <div className="flex flex-col items-center py-6 animate-scale-in p-0 md:p-8">
                                    <div className="w-16 h-16 rounded-full border-2 border-[#3A3024] flex items-center justify-center mb-6 text-[#3A3024]">
                                        <RiCloseLine size={32} />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl uppercase  mb-4">Oops!</h3>
                                    <p className="text-sm  uppercase  ">Something went wrong.<br /> Please try again later.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Contact