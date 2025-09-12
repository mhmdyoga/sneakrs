"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const FetchProductCategory = ({ items }: any) => {
  const [isSize, setIsSize] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart()

  // size data
  const item = [
    {
      id: 1,
      size: 38,
    },
    {
      id: 2,
      size: 39,
    },
    {
      id: 3,
      size: 40,
    },
    {
      id: 4,
      size: 41,
    },
    {
      id: 5,
      size: 42,
    },
    {
      id: 6,
      size: 43,
    },
    {
      id: 7,
      size: 44,
    },
    {
      id: 8,
      size: 45,
    },
  ];

  // function getSize to user can choose their size
  const getSize = (size: number) => {
    setIsSize(size);
  }

  return (
    <div className="-m-10 flex flex-col -ml-60 md:ml-0 md:flex-row justify-between items-center gap-10 md:gap-20">
      <div className="w-[340px] md:w-[440px]">
        <Image
          src={items?.imageUrl}
          unoptimized={true}
          priority={true}
          alt="img"
          width={250}
          height={250}
          className="w-auto h-auto"
          
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-3xl ml-4">{items?.title}</h2>
          <h5 className="font-semibold text-xl ml-4">${items?.price}</h5>
          <h5 className="font-semibold text-xs ml-4">stock: {items?.stock}</h5>
          <div className="">
            <h5 className="flex font-semibold text-xs ml-4 flex-col gap-2">category:  {items.category.map((cat: any) => (
              <div key={cat.id} className="bg-black text-white w-14 h-6 p-1 flex flex-row justify-center items-center rounded-md">
                <span>{`${cat.category}`}</span>
              </div>
            ))}
           </h5>
          </div>
        <div className="grid md:grid-cols-3 grid-cols-2">
          {item.map((value: { size: number; id: number }) => (
            <div key={value.id} className="p-4">
              <Button variant={"default"} onClick={() => getSize(value.size)} className="w-24 h-auto items-center flex justify-center">
                <span className={`${isSize === value.size ? "underline" : ""}`}>{value.size}</span>
              </Button>
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-3 items-center">
          <Button variant={"ghost"} disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}> - </Button>
           <h4>{quantity}</h4>
          <Button variant={"ghost"} onClick={() => setQuantity(quantity + 1)}> + </Button>
        </div>
        <div className="ml-4">
          <Button variant={"outline"} onClick={() => addToCart(items, isSize, quantity)} className="flex flex-row-reverse gap-4">Add To Cart <span><ShoppingBag/></span></Button>
        </div>
      </div> 
    </div>
  );
};

export default FetchProductCategory;
