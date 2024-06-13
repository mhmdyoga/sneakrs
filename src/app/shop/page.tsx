"use client"
import DataAllProduct from '@/components/fragment/DataAllProduct'
import { Globalapi } from '@/components/utils/GlobalApi'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Shop = () => {
    const [dataAll, setDataAll] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        DataProduct();
        Category();
    });

    const DataProduct = () => {
    Globalapi.getAllProduct().then((res) => {
        setDataAll(res.data.data)
    });
    };
    // get category
    const Category = () => {
    Globalapi.getCategoryList().then((res) => {
        setCategoryList(res.data.data)
        console.log(res.data.data);
    });
    };

  return (
    <div className='flex flex-row gap-12'>
        <div className='w-56 h-screen bg-white shadow-md overflow-hidden'>
            <div className='flex flex-col gap-4 md:mx-8 mx-0 mt-16 md:p-12 p-4'>
                {categoryList.map((category: any, index: number) => (
                    <Link href={`/products/${category.attributes.name}`} key={index}>
                        <h2 className='font-semibold italic hover:scale-105 transition-all'>{category.attributes.name}</h2>
                    </Link>
                ))}
            </div>
        </div>
        <div className='w-full'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 p-0 -mx-3 md:mt-0 mt-12 md:p-24'>
                {dataAll.map((item: any, index: number) => (
                <DataAllProduct key={index} item={item}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Shop