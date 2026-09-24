import React from 'react'

const About = () => {
    return (
        <>
            <section className='w-full relative bg-[#EDE3D5] text-[#3A3024] py-44  px-6 flex flex-col items-center justify-center'>
                <div className="flex flex-col items-center text-center max-w-2xl w-full space-y-12 ">

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

                <img className=' w-[25vw] absolute bottom-0 right-0 z-10' src="/images/flower.png" alt="" />
        <img className=' w-[25vw] absolute top-0 left-0 z-10' src="/images/falling_flower.png" alt="" />

            </section>
        </>
    )
}

export default About