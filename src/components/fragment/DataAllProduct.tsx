import Image from 'next/image';
import React, { useState } from 'react';
import CustomButton from './CustomButton';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import { useToast } from '../ui/use-toast';
import { Globalapi } from '../utils/GlobalApi';

  
const DataAllProduct = ({item}: any) => {
  const [quantity, setQuantity] = useState(1);
  const {toast} = useToast();

  const AddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: 'You must be Login',
        variant: 'destructive',
      })
      window.location.href = '/auth/sign-in'
    } else {
      const data = {
        data : {
          quantity: quantity,
          nameproduct: item?.attributes?.nameproduct || '',
          products: item?.id || '',
          amount: (quantity * item?.attributes?.price).toFixed(2)
        }
      };
      Globalapi.postCart(data, token).then((res: any) => {
        console.log(res);
        toast({
          title: "Add to cart success",
          description: "HAPPY SHOPPING!!!",
        });
      });
    }
  };


  return (
    <div className=''>
        <div className='border border-gray-300 p-8 rounded-md'>
          <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + item?.attributes?.image?.data[0].attributes?.url} unoptimized={true} alt="img" width={500} height={500}/>
          <div className='flex flex-col gap-2 font-bold'>
            <h2 className='text-xs md:text-lg'>{item?.attributes?.nameproduct}</h2>
            <span className='text-xs md:text-lg'>${item?.attributes?.price}</span>
          </div>
          <AlertDialog>
            <AlertDialogTrigger>
                <CustomButton title='Add To Cart' style='bg-black text-xs md:text-sm p-2 text-white font-bold rounded-md'/>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogDescription>
                  <div className="flex flex-col md:flex-row gap-4 ">
                    <Image alt="img" src={process.env.NEXT_PUBLIC_API_BASE_URL + item?.attributes?.image?.data[0].attributes?.url} unoptimized={true} priority width={400} height={400}/>
                    <div className='flex flex-col gap-2 font-bold'>
                      <h2 className='text-xs md:text-2xl'>{item?.attributes?.nameproduct}</h2>
                      <span className='font-medium text-sm text-slate-400'>{item?.attributes?.description}</span>
                      <div className='flex flex-row gap-2 items-center'>
                      <button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)} className={`${quantity === 1 ? 'bg-slate-400' : 'bg-black'} text-white p-1 items-center flex rounded-md`}>-</button>
                      <span className='font-semibold'>{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className='bg-black flex items-center p-1 text-white rounded-md'>+</button>
                      <span className="text-black font-bold">=</span> <span>${(quantity * item?.attributes?.price).toFixed(2)}</span>
                      </div>
                      <span className='text-xs md:text-lg'>${item?.attributes?.price}</span>
                      <CustomButton title='Add To Cart' onClick={AddToCart} style='bg-black text-xs md:text-lg p-2 text-white font-bold rounded-md'/>
                    </div>
                  </div>
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogAction>X</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
        </div>
    </div>
  )
}

export default DataAllProduct