"use client";
import FetchProductCategory from "@/components/fragment/FetchProductCategory";
import { useToast } from "@/components/ui/use-toast";
import { Globalapi } from "@/components/utils/GlobalApi";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Brands = ({ params: { name } }: any) => {
  const [productCategory, setProductCategory] = useState<any[]>([]);
  const [categoryLink, setCategoryLink] = useState([]);
  const { toast } = useToast()

  useEffect(() => {
    const fetchDataCategory = async () => {
      try {
        const decodeURi: any = decodeURI(name);
        const respone = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?filters[Brands][name][$in]=${decodeURi}&populate=*`
        );
        setProductCategory(respone.data.data);
      } catch (error) {
        console.error("eror fetching data:", error);
      }
    };
    fetchDataCategory();
    CategoryListLink();
  }, [name]);

  const CategoryListLink = () => {
    Globalapi.getCategoryList().then((res) => {
      setCategoryLink(res.data.data);
    });
  }

  return (
    <div className="flex flex-row gap-4">
      <div className='w-56 h-screen bg-white shadow-md overflow-hidden'>
            <div className='flex flex-col gap-4 md:mx-8 mx-0 mt-16 md:p-12 p-4'>
                {categoryLink.map((category: any, index: number) => (
                    <Link href={`/products/${category.attributes.name}`} key={index}>
                        <h2 className='font-semibold italic hover:scale-105 transition-all'>{category.attributes.name}</h2>
                    </Link>
                ))}
            </div>
        </div>
      <div className="-mx-3 -mt-20">
        <h2 className="text-black font-bold p-28">
          Recommended Products By:{" "}
          <span className="font-bold text-black">{decodeURI(name)}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-20 mt-[-140px] gap-8">
          {productCategory.map((items: any, index: number) => (
            <FetchProductCategory key={index} items={items} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
