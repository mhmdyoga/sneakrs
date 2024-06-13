"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import react from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { League_Gothic } from 'next/font/google';
import { MotionDiv } from '@/components/motion/page';
import CustomButton from '@/components/fragment/CustomButton';
//   font goole
  const LeagueGhotic = League_Gothic({
    weight: ["400"],
    subsets: ["latin"],
  });
// anumer
  const fromRightImg = {
    offScreen: {
        opacity: 0,
        x: 100,
    },
    onScreen: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 2
        }
    },
    exit: {
        opacity: 0.5,
        x: -100,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 1
        },
    },
    whileInView: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 2
        }
    },
  }
  const fromRightText = {
    offScreen: {
        opacity: 0,
        x: 100,
    },
    onScreen: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 4.5
        }
    },
    exit: {
        opacity: 0.5,
        x: -100,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 1
        },
    },
    whileInView: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 4.5
        }
    },
  }

const Beranda = () => {
    return (
        <>
        <div>
        <Carousel>
            <CarouselContent>
                <CarouselItem className='bg-gradient-to-tr from-[#000] via-[#412e2e] to-[#ce0f0f] w-full h-screen flex items-center justify-center'>
                    <div className='mt-[-120px]'>
                        <MotionDiv initial="offScreen" whileInView="onScreen" viewport={{once: true, amount: 0.5}} variants={fromRightImg} exit="exit">
                        <Image alt="img" src={`/rero1.png`} width={600} height={600} className='md:ml-12'/>    
                        </MotionDiv>
                        <MotionDiv initial="offScreen" whileInView="onScreen" viewport={{once: true, amount: 0.5}} variants={fromRightText} exit="exit" className='mt-[-320px] ml-12'>
                            <h2 className={`${LeagueGhotic.className} font-bold text-6xl md:text-[136px] mx-[-18px] text-white`}>Jor<span className='md:outline-text text-white'>dan</span> <span className='outline-text'>Retro</span> X-1</h2>
                        </MotionDiv>
                    </div>
                </CarouselItem>
                <CarouselItem className='bg-gradient-to-tr from-[#fff] via-[#caabab] to-[#b40fce] w-full h-screen flex items-center justify-center'>
                     <div className='mt-[-120px]'>
                        <MotionDiv initial="offScreen" whileInView="onScreen" viewport={{once: true, amount: 0.5}} variants={fromRightImg} exit="exit">
                            <Image alt="img" src={`/purple-court-1.png`} width={600} height={600} className='md:ml-32'/>
                        </MotionDiv>
                        <MotionDiv initial="offScreen" whileInView="onScreen" viewport={{once: true, amount: 0.5}} variants={fromRightText} exit="exit" className='mt-[-320px] ml-12'>
                            <h2 className={`${LeagueGhotic.className} font-bold text-6xl md:text-[136px] mx-[-18px] text-white`}>Jordan <span className='outline-text text-white'>1</span> <span className='outline-text'>Court</span> Purple</h2>
                        </MotionDiv>
                    </div>
                </CarouselItem>
                <CarouselItem className='bg-gradient-to-tr from-[#fff] via-[#fac658] to-[#7d7cb6] w-full h-screen flex items-center justify-center'>
                <div className='mt-[-120px]'>
                    <MotionDiv initial="offScreen" whileInView="onScreen" viewport={{once: true, amount: 0.5}} variants={fromRightImg} exit="exit">
                        <Image alt="img" src={`/mid-lakers-1.png`} width={600} height={600} className='md:ml-36'/>
                    </MotionDiv>
                        <MotionDiv initial="offScreen" whileInView="onScreen" viewport={{once: true, amount: 0.5}} variants={fromRightText} exit="exit" className='mt-[-320px] ml-12'>
                            <h2 className={`${LeagueGhotic.className} font-bold text-6xl md:text-[136px] mx-[-18px] text-white`}>Jordan <span className='outline-text text-white'>1</span> <span className='outline-text'>Mid</span> Lakers</h2>
                        </MotionDiv>
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className=' mx-12'/>
            <CarouselNext className='mx-12'/>
        </Carousel>
        </div>
        <div>
          <MotionDiv initial="offScreen" whileInView="onScreen" viewport={{once: true, amount: 0.5}} variants={fromRightText} exit="exit" className="flex flex-col items-center justify-center">
            <Image alt="img" src="/sneakers-ball.png" width={400} height={400}/>
          </MotionDiv>
          <MotionDiv initial="offScreen" whileInView="onScreen" viewport={{once: true, amount: 0.5}} variants={fromRightText} exit="exit" className="flex flex-col gap-2">
            <h2 className="font-extrabold text-4xl md:text-6xl text-center">MVP COLLECTION</h2>
            <p className="font-semibold text-center text-sm md:text-xl text-slate-400">Find out your style with our Sneakers Collection <br/> and your the best stylish ever see.</p>
            <CustomButton title='Explore Now!!!' style='bg-black text-white font-bold md:ml-[600px] ml-[100px] p-2 rounded-full text-center flex jsutify-center items-center'/>
          </MotionDiv>
        </div>
        <div>
            <MotionDiv initial="offScreen" whileInView="onScreen" viewport={{once: true, amount: 0.5}} variants={fromRightText} exit="exit" className='grid grid-cols-2 md:grid-cols-3 gap-12 mx-44 my-10'>
                <Image alt="img" src="/img-1.png" width={500} height={500}/>
                <Image alt="img" src="/img-2.png" width={500} height={500}/>
                <Image alt="img" src="/img-3.png" width={500} height={500}/>
            </MotionDiv>
        </div>
        <div>
            <Image src="/baner-1.png" alt="img" width={1600} height={1200} className='w-full h-80 object-cover'/>
        </div>
        </>
    )
}

export default Beranda
