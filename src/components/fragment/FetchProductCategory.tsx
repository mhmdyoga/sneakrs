"use client"
import Image from "next/image";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const FetchProductCategory = ({ items }: any) => {
    const [quantity, setQuantity] = useState(1);
  return (
    <div className="">
      <div className="border border-gray-300 p-4 rounded-md">
        <Image
          src={
            process.env.NEXT_PUBLIC_API_BASE_URL +
            items?.attributes?.image?.data[0].attributes?.url
          }
          unoptimized={true}
          priority={true}
          alt="img"
          width={300}
          height={300}
        />
        <div>
          <h2 className="font-semibold">{items?.attributes?.nameproduct}</h2>
          <span className="font-semibold">${items?.attributes?.price}</span>
        </div>
        <AlertDialog>
          <AlertDialogTrigger>
            <CustomButton
              title="Add To Cart"
              style="bg-black text-xs md:text-sm p-2 text-white font-bold rounded-md"
            />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogDescription>
                <div className="flex flex-col md:flex-row gap-2">
                    <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + items?.attributes?.image?.data[0].attributes?.url} unoptimized={true} priority={true} alt="img" width={400} height={400}/>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-semibold text-black text-2xl">{items?.attributes?.nameproduct}</h2>
                        <span className="font-semibold text-xs">{items?.attributes?.description}</span>
                        <div className="flex flex-row gap-2 items-center">
                        <button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)} className={`${quantity === 1 ? 'bg-gray-300' : 'bg-black'} text-xs md:text-sm p-2 text-white font-bold rounded-md`}>-</button>
                        <span className="font-bold text-black">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="bg-black text-xs md:text-sm p-2 text-white font-bold rounded-md">+</button>
                        <span className="font-bold text-black">=</span> <span className="font-bold text-black">${(quantity * items?.attributes?.price).toFixed(2)}</span>
                        </div>
                        <span className="font-semibold text-black">${items?.attributes?.price}</span>
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
  );
};

export default FetchProductCategory;
