"use client";
import { useGSAP } from '@gsap/react';
import { RiCloseLine } from '@remixicon/react';
import gsap from 'gsap';
import React, { useState, useEffect } from 'react'

const CustomDropdown = ({ value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
        const handleClickOutside = () => setIsOpen(false);
        if (isOpen) {
            setTimeout(() => document.addEventListener('click', handleClickOutside), 0);
        }
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isOpen]);

    return (
        <div className="relative w-full text-lg" onClick={(e) => e.stopPropagation()}>
            <div 
                className="w-full bg-transparent border-b cursor-pointer border-[#F3EBE9]/50 hover:border-[#F3EBE9] outline-none transition-colors  flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{value}</span>
                <span className={`text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </div>
            
            <div className={`absolute top-full left-0 w-full mt-1 bg-[#F3EBE9] text-[#605C58] rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)] z-50 overflow-hidden transition-all duration-300 origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
                <div className="max-h-48 overflow-y-auto">
                    {options.map((option) => (
                        <div 
                            key={option}
                            className="px-3 py-2 hover:bg-[#605C58]/10 cursor-pointer transition-colors"
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Home = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
    const [isPastDate, setIsPastDate] = useState(false);
    const [isRsvpOpen, setIsRsvpOpen] = useState(false);
    const [rsvpData, setRsvpData] = useState({ guests: [{ title: 'Mr.', fullName: '' }], email: '', contact: '', attending: null });
    const [rsvpStatus, setRsvpStatus] = useState('idle');
    const [rsvpMessage, setRsvpMessage] = useState('');

    const handleRsvpSubmit = async (e) => {
        e.preventDefault();

        if (rsvpData.attending === null) {
            setRsvpStatus('error');
            setRsvpMessage('Please select whether you will attend or not.');
            return;
        }

        setRsvpStatus('loading');
        setRsvpMessage('');

        try {
            const res = await fetch('/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rsvpData)
            });
            const data = await res.json();

            if (res.ok) {
                setRsvpStatus('success');
                setRsvpMessage('Your RSVP has been submitted successfully!');
                setRsvpData({ guests: [{ title: 'Mr.', fullName: '' }], email: '', contact: '', attending: null });
            } else {
                setRsvpStatus('error');
                setRsvpMessage(data.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setRsvpStatus('error');
            setRsvpMessage('An error occurred. Please try again later.');
        }
    };

    useEffect(() => {
        const targetDate = new Date('2026-11-08T00:00:00').getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft({ days, hours, minutes });
                setIsPastDate(false);
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0 });
                setIsPastDate(true);
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    const pad = (num) => String(num).padStart(2, '0');

    useGSAP(() => {
        const tl = gsap.timeline()
        tl.to(".anim_prt_name", {
            opacity: 1,
        })
        tl.to(".anim_prt_bg", {
            opacity: 1,
            delay: 0.5
        })
        tl.to(".anim_prt", {
            opacity: 1,
            stagger: 0.15
        })
    });

    return (
        <>
            <div className="w-full pt-5 h-screen bg-[#F3F1EC]  text-[#605C58] relative">

                <div className=" anim_prt_bg opacity-0 absolute inset-0">
                    <img className='cover' src="/images/flower_bg.webp" alt="" />
                </div>
                <div className="relative overflow-hidden  z-10 w-full h-full center">
                    <div className="w-full md:w-[60%] mx-auto  h-full  relative ">
                        <img className=' anim_prt_bg opacity-0 max-sm:h-full absolute inset-0 translate-x-4.5 md:translate-x-9 pointer-events-none z-100 w-full' src="/images/frame.webp" alt="" />
                        <div className="w-[85%]  mx-auto h-full  overflow-hidden rounded-t-full  relative">
                            <img className=' anim_prt_bg opacity-0 absolute h-full w-full z-[-1]' src="/images/paper.webp" alt="" />

                            <div className=" pt-[6vh] md:pt-[14vh] relative h-full pb-[3vh] md:pb-[3vh]  flex flex-col items-center justify-between  z-10">
                                <img className='anim_prt opacity-0 w-20 md:w-24' src="/images/logo.webp" alt="" />
                                <div className=" anim_prt_name opacity-0 center ">
                                    <p className='absolute'>AND</p>
                                    <img className=' w-[70%] md:w-[18rem]' src="/images/name.webp" alt="" />
                                </div>
                                <p className=" anim_prt opacity-0 uppercase leading-none text-xl md:text-2xl ">
                                    NOVEMBER 8 , 2026
                                </p>
                                <div className=" anim_prt opacity-0 text-xs md:text-sm uppercase text-center">
                                    <p> The Duggal Greenhouse</p>
                                    <p>Brooklyn, New York</p>
                                </div>

                                {!isPastDate && (
                                    <div className=" anim_prt opacity-0 flex items-center leading-none gap-6 md:gap-10 ">
                                        <div className="flex flex-col items-center">
                                            <span className=" text-4xl ">{pad(timeLeft.days)}</span>
                                            <span className="text-xs mt-1 uppercase">Days</span>
                                        </div>
                                        <span className="text-2xl">|</span>
                                        <div className="flex flex-col items-center">
                                            <span className=" text-4xl ">{pad(timeLeft.hours)}</span>
                                            <span className="text-xs mt-1 uppercase">Hours</span>
                                        </div>
                                        <span className="text-2xl">|</span>
                                        <div className="flex flex-col items-center">
                                            <span className=" text-4xl ">{pad(timeLeft.minutes)}</span>
                                            <span className="text-xs mt-1 uppercase">Minutes</span>
                                        </div>
                                    </div>
                                )}

                                <div className=" anim_prt opacity-0 flex flex-col md:flex-row items-center gap-y-2 gap-x-5">
                                    <div className="">
                                        <button onClick={() => setIsRsvpOpen(true)} className=' text-xs md:text-sm  w-[60vw] md:w-60 py-2.5 rounded-sm font-medium z-10 relative border md:border-2 text-[#605C58] border-[#605C58] hover:text-[#F3EBE9] hover:bg-[#605C58] transition-all duration-300 uppercase'>RSVP</button>
                                    </div>
                                    <div className="">
                                        <a target='_blank' rel="noreferrer" href="https://registryfinder.com/registry/akiva-gluck/adina-spiegel/wedding/november-2026/new-york/7092530">
                                            <button className=' text-xs md:text-sm  w-[60vw] md:w-60 py-2.5 rounded-sm font-medium z-10 relative border md:border-2 text-[#605C58] border-[#605C58] hover:text-[#F3EBE9] hover:bg-[#605C58] transition-all duration-300 uppercase'>Gift Registry</button>
                                        </a>
                                    </div>
                                </div>
                                <div className="anim_prt opacity-0 text-xs md:text-sm uppercase text-center">
                                    <p> Black Tie • Modest Dress Requested</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* RSVP Modal */}
            <div
                className={`fixed inset-0 z-[1000] flex items-center justify-center transition-all duration-500 ${isRsvpOpen ? 'opacity-100 visible backdrop-blur-sm bg-black/30' : 'opacity-0 invisible backdrop-blur-none bg-black/0'}`}
                onClick={() => setIsRsvpOpen(false)}
            >
                <div
                    className={`bg-[#605C58] text-[#F3EBE9] p-8 md:p-10 rounded-lg w-[90%] max-w-[500px] max-h-[90vh] overflow-y-auto relative transition-all duration-500 ${isRsvpOpen ? 'scale-100' : 'scale-95 '}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={() => { setIsRsvpOpen(false); setTimeout(() => setRsvpStatus('idle'), 500); }}
                        className="absolute top-4 right-5 hover:opacity-70 transition-opacity leading-none z-50"
                    >
                        <RiCloseLine className='size-8' />
                    </button>
                    <h2 className="text-3xl uppercase text-center mb-8 relative z-10">RSVP</h2>

                    {/* Status Popups */}
                    <div className={`absolute inset-0 z-40 flex flex-col items-center justify-center p-8 text-center transition-all duration-500 bg-[#605C58] ${rsvpStatus === 'success' || rsvpStatus === 'error' ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                        {rsvpStatus === 'success' && (
                            <div className="flex flex-col items-center animate-in zoom-in duration-500">
                                <div className="w-20 h-20 rounded-full border-2 border-[#F3EBE9] flex items-center justify-center mb-6">
                                    <span className="text-4xl text-[#F3EBE9]">✓</span>
                                </div>
                                <h3 className="text-3xl uppercase mb-4">Thank You!</h3>
                                <p className="text-lg opacity-80">{rsvpMessage}</p>
                                <button onClick={() => { setIsRsvpOpen(false); setTimeout(() => setRsvpStatus('idle'), 500); }} className="mt-10 border-2 border-[#F3EBE9] text-[#F3EBE9] hover:bg-[#F3EBE9] hover:text-[#605C58] px-10 py-3 uppercase tracking-widest transition-all duration-300 font-medium rounded-sm">Close</button>
                            </div>
                        )}
                        {rsvpStatus === 'error' && (
                            <div className="flex flex-col items-center animate-in zoom-in duration-500">
                                <div className="w-20 h-20 rounded-full border-2 border-[#F3EBE9] flex items-center justify-center mb-6">
                                    <span className="text-4xl text-[#F3EBE9]">!</span>
                                </div>
                                <h3 className="text-3xl uppercase mb-4">Oops</h3>
                                <p className="text-lg opacity-80">{rsvpMessage}</p>
                                <button onClick={() => setRsvpStatus('idle')} className="mt-10 border-2 border-[#F3EBE9] text-[#F3EBE9] hover:bg-[#F3EBE9] hover:text-[#605C58] px-10 py-3 uppercase tracking-widest transition-all duration-300 font-medium rounded-sm">Try Again</button>
                            </div>
                        )}
                    </div>

                    <form data-lenis-prevent onSubmit={handleRsvpSubmit} className="flex flex-col gap-6 relative z-10">
                        <div className="flex flex-col gap-4">
                            {rsvpData.guests.map((guest, index) => (
                                <div key={index} className="flex gap-4 items-end">
                                    <div className="w-1/3 sm:w-1/4">
                                        <label className="block uppercase mb-1 text-sm sm:text-base">Title</label>
                                        <CustomDropdown
                                            value={guest.title}
                                            onChange={(val) => {
                                                const newGuests = [...rsvpData.guests];
                                                newGuests[index].title = val;
                                                setRsvpData({ ...rsvpData, guests: newGuests });
                                            }}
                                            options={['Mr.', 'Mrs.', 'Ms.', 'Master.', 'Dr.', 'Rabbi.', 'Rebbitzen']}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block uppercase mb-1 text-sm sm:text-base">Guest  <span className='text-xl'>{index + 1}</span> Full Name</label>
                                        <input
                                            type="text"
                                            value={guest.fullName}
                                            onChange={(e) => {
                                                const newGuests = [...rsvpData.guests];
                                                newGuests[index].fullName = e.target.value;
                                                setRsvpData({ ...rsvpData, guests: newGuests });
                                            }}
                                            className="w-full bg-transparent border-b border-[#F3EBE9]/50 focus:border-[#F3EBE9] outline-none transition-colors text-lg"
                                            required
                                        />
                                    </div>
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newGuests = rsvpData.guests.filter((_, i) => i !== index);
                                                setRsvpData({ ...rsvpData, guests: newGuests });
                                            }}
                                            className=" text-sm uppercase opacity-70 hover:opacity-100 transition-opacity"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => setRsvpData({ ...rsvpData, guests: [...rsvpData.guests, { title: 'Mr.', fullName: '' }] })}
                                className="text-left text-sm uppercase underline opacity-70 hover:opacity-100 transition-opacity mt-1 self-start"
                            >
                                + Add another guest
                            </button>
                        </div>
                        <div>
                            <label className="block uppercase mb-1">Email</label>
                            <input
                                type="email"
                                value={rsvpData.email}
                                onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                                className="w-full bg-transparent border-b border-[#F3EBE9]/50 focus:border-[#F3EBE9] outline-none transition-colors text-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block uppercase mb-1">Contact Number</label>
                            <input
                                type="tel"
                                value={rsvpData.contact}
                                onChange={(e) => setRsvpData({ ...rsvpData, contact: e.target.value.replace(/\D/g, '') })}
                                className="w-full bg-transparent border-b border-[#F3EBE9]/50 focus:border-[#F3EBE9] outline-none transition-colors text-lg"
                                required
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 border-2 border-[#F3EBE9] rounded-sm flex items-center justify-center transition-colors ${rsvpData.attending === true ? 'bg-[#F3EBE9]' : 'bg-transparent group-hover:bg-[#F3EBE9]/20'}`}>
                                    {rsvpData.attending === true && <div className="w-2.5 h-2.5 bg-[#605C58] rounded-sm"></div>}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={rsvpData.attending === true}
                                    onChange={() => setRsvpData({ ...rsvpData, attending: true })}
                                />
                                <span className="uppercase leading-none translate-y-0.25">Will Attend</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 border-2 border-[#F3EBE9] rounded-sm flex items-center justify-center transition-colors ${rsvpData.attending === false ? 'bg-[#F3EBE9]' : 'bg-transparent group-hover:bg-[#F3EBE9]/20'}`}>
                                    {rsvpData.attending === false && <div className="w-2.5 h-2.5 bg-[#605C58] rounded-sm"></div>}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={rsvpData.attending === false}
                                    onChange={() => setRsvpData({ ...rsvpData, attending: false })}
                                />
                                <span className="uppercase leading-none translate-y-0.25">Will Not Attend</span>
                            </label>
                        </div>


                        <button
                            type="submit"
                            disabled={rsvpStatus === 'loading'}
                            className={`mt-6 border-2 border-[#F3EBE9] hover:text-[#F3EBE9] bg-[#F3EBE9] hover:bg-transparent text-[#605C58] py-3.5 uppercase transition-all duration-300 font-medium rounded-sm flex justify-center items-center ${rsvpStatus === 'loading' ? 'opacity-70 pointer-events-none' : ''}`}
                        >
                            {rsvpStatus === 'loading' ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Home