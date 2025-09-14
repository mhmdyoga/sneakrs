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
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useApi } from '@/components/utils/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link';
//   font goole
  const LeagueGhotic = League_Gothic({
    weight: ["400"],
    subsets: ["vietnamese"],
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

    const api = useApi();

    const { data }  = useQuery({
        queryKey: ['new-arrival'],
        queryFn: async () => {
            const res = await api.get('/product/new/arrvival');
            return res.data.product;
        }
    });

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
            <CustomButton title='Explore Now!!!' onClick={() => window.location.href = "/shop"} style="bg-black text-white font-bold md:ml-[680px] ml-[150px] p-2 rounded-full text-center flex justify-center items-center"/>
          </MotionDiv>
        </div>
        <div className='my-6 flex flex-col items-center'>
           <Image src="/5-sneakers-by-cities-of-indonesia.webp" alt='img' width={480} height={480} className='w-[1480px] h-auto'/>
           <h2 className='font-bold flex justify-start items-start text-black text-center md:text-start text-4xl mt-8'>Sneakers.co Releases DIVERCITY™, Honoring Five Cities Across Indonesia</h2>
           <Button variant={"default"} className='mt-8'>Check it Out</Button>
        </div>
        <h2 className='text-[#111] font-bold text-3xl p-4'>New Arrival</h2>
        <div>
           <ScrollArea className='w-full h-[400px] px-4'>
           <div className='flex flex-row gap-4'>
             {data?.map((item: any, index: number) => (
              <div key={item.id}>
                <div className="flex flex-col gap-2">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={400}
                    height={365}
                    className="w-96 h-auto"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-black text-lg">
                      {item.title}
                    </h3>
                    <h3 className="font-semibold text-black text-xs">
                      ${item.price}
                    </h3>
                  </div>
                </div>
                <Link
                  href={`/products/${item.title}`}
                  key={index}
                  className="mt-[15px]"
                >
                  <Button variant={"default"}>View Product</Button>
                </Link>
              </div>
            ))}
           </div>
           </ScrollArea>
        </div>
         <h1 className='text-[#111] font-bold p-4 text-3xl'>Explore The Sneakers.co Collection</h1>
        <div className='flex md:flex-row flex-col-reverse gap-12 md:gap-4 p-4'>
            <div className='flex flex-col'>
              <Image src="/nigga.webp" alt='img' width={480} height={480} className='w-[560px] h-auto'/>
              <h2 className='-mt-24 text-white font-semibold p-2 text-2xl'>Explore The Basketball Category</h2>
              <Button variant={"secondary"} className='w-40 h-8 text-black ml-3'>Shop</Button>
            </div>
            <div className='flex flex-col'>
               <Image src="/baner-1.png" alt="img" width={480} height={480} className='w-[890px] h-auto md:h-[560px]'/> 
               <h2 className='-mt-24 text-white font-semibold p-2 text-2xl'>Explore the Lifestyle</h2>
               <Button variant={"secondary"} className='w-40 h-8 text-black ml-3'>Shop</Button>
            </div>
        </div>
        </>
    )
}

export default Beranda
